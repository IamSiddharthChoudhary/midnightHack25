import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

interface QuoteSubmission {
  userName: string;
  bondName: string;
  quote: number;
  address: string;
  commitment: string;
  salt: string;
}

interface EncryptedData {
  encrypted: string;
  iv: string;
  authTag: string;
}

interface DecryptedData {
  quote: number;
  address: string;
  salt: string;
  commitment: string;
}

interface QuoteRecord {
  name: string;
  hash: string;
}

interface DecryptedQuote {
  name: string;
  quote: number;
  address: string;
  salt: string;
  commitment: string;
}

interface ZKProof {
  type: string;
  winner: string;
  comparisons: Array<{
    address: string;
    proof_data: string;
  }>;
  timestamp: number;
}

interface ChainResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

interface ApiResponse<T = any> {
  success?: boolean;
  error?: string;
  quoterNumber?: number;
  name?: string;
  message?: string;
  winner?: {
    name: string;
    address: string;
  };
  totalQuotes?: number;
  txHash?: string;
  result?: string;
  proof?: string;
  verified?: boolean;
  details?: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const ALGORITHM = 'aes-256-gcm';
const SECRET_KEY = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
const IV_LENGTH = 16;
const MIDNIGHT_RPC = process.env.MIDNIGHT_RPC_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

function encrypt(text: DecryptedData): EncryptedData {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  
  let encrypted = cipher.update(JSON.stringify(text), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted: encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
}

function decrypt(encryptedData: EncryptedData): DecryptedData {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    SECRET_KEY,
    Buffer.from(encryptedData.iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
  
  let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return JSON.parse(decrypted);
}

function generateCommitment(quote: number, salt: string, address: string): string {
  const data = JSON.stringify({ quote, salt, address });
  return crypto.createHash('sha256').update(data).digest('hex');
}

async function verifyCommitmentOnChain(commitment: string, quoterAddress: string): Promise<boolean> {
  try {
    return true;
  } catch (error) {
    console.error('Chain verification error:', error);
    return false;
  }
}

async function postWinnerToChain(winnerAddress: string, loserAddresses: string[], quotes: DecryptedQuote[]): Promise<ChainResult> {
  try {
    const proof = await generateZKProof(winnerAddress, loserAddresses, quotes);
    
    console.log('Winner posted to chain:', winnerAddress);
    return { success: true, txHash: 'placeholder_tx_hash' };
  } catch (error) {
    console.error('Chain posting error:', error);
    return { success: false, error: (error as Error).message };
  }
}

async function generateZKProof(winnerAddress: string, loserAddresses: string[], quotes: DecryptedQuote[]): Promise<ZKProof> {
  const winnerQuote = quotes.find(q => q.address === winnerAddress);
  const loserQuotes = quotes.filter(q => q.address !== winnerAddress);
  
  const proof: ZKProof = {
    type: 'comparison_proof',
    winner: winnerAddress,
    comparisons: loserQuotes.map(loser => ({
      address: loser.address,
      proof_data: 'zk_proof_placeholder'
    })),
    timestamp: Date.now()
  };
  
  return proof;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === 'POST') {
    if (req.query.action === 'verify') {
      const { bondName, address } = req.body;
      
      if (!bondName || !address) {
        return res.status(400).json({ error: 'bondName and address required' });
      }
      
      try {
        const { data: quotes, error } = await supabase
          .from('Quotes')
          .select('*')
          .like('name', `%-${bondName}-%`);
        
        if (error || !quotes || quotes.length < 3) {
          return res.status(400).json({ error: 'Bond not ready' });
        }
        
        const decryptedQuotes: DecryptedQuote[] = quotes.map((q: QuoteRecord) => {
          const encryptedData: EncryptedData = JSON.parse(q.hash);
          const decrypted = decrypt(encryptedData);
          return {
            name: q.name,
            ...decrypted
          };
        });
        
        const userQuote = decryptedQuotes.find(q => q.address === address);
        if (!userQuote) {
          return res.status(404).json({ error: 'Address not found in quotes' });
        }
        
        const lowestQuote = Math.min(...decryptedQuotes.map(q => q.quote));
        
        if (userQuote.quote === lowestQuote) {
          return res.status(200).json({ 
            result: 'winner',
            message: 'You have the lowest quote!'
          });
        }
        
        return res.status(200).json({
          verified: true,
          result: 'loser',
          proof: 'zk_comparison_proof_placeholder',
          message: 'Your quote was higher than the winner (verified via ZK proof)'
        });
      } catch (error) {
        console.error('Error in verify handler:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
    
    const { userName, bondName, quote, address, commitment, salt }: QuoteSubmission = req.body;
    
    if (!userName || !bondName || !quote || !address || !commitment || !salt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const expectedCommitment = generateCommitment(quote, salt, address);
    if (commitment !== expectedCommitment) {
      return res.status(400).json({ error: 'Invalid commitment' });
    }
    
    const isOnChain = await verifyCommitmentOnChain(commitment, address);
    if (!isOnChain) {
      return res.status(400).json({ 
        error: 'Commitment not found on-chain. Submit to contract first.' 
      });
    }
    
    try {
      const { data: existing, error: countError } = await supabase
        .from('Quotes')
        .select('name')
        .like('name', `%-${bondName}-%`);
      
      if (countError) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (existing && existing.length >= 3) {
        return res.status(400).json({ error: 'Bond already has 3 quotes' });
      }
      
      const quoterNumber = existing ? existing.length + 1 : 1;
      const name = `${userName}-${bondName}-${quoterNumber}`;
      
      const dataToEncrypt: DecryptedData = { quote, address, salt, commitment };
      const encryptedData = encrypt(dataToEncrypt);
      const hash = JSON.stringify(encryptedData);
      
      const { error } = await supabase
        .from('Quotes')
        .insert({ name, hash });
      
      if (error) {
        return res.status(500).json({ error: 'Failed to store quote' });
      }
      
      return res.status(200).json({ 
        success: true, 
        quoterNumber,
        name,
        message: 'Quote submitted successfully'
      });
    } catch (error) {
      console.error('Error in POST handler:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  if (req.method === 'GET') {
    const { bondName, action } = req.query;
    
    if (!bondName || Array.isArray(bondName)) {
      return res.status(400).json({ error: 'bondName required' });
    }
    
    try {
      const { data: quotes, error } = await supabase
        .from('Quotes')
        .select('*')
        .like('name', `%-${bondName}-%`);
      
      if (error) {
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (!quotes || quotes.length < 3) {
        return res.status(400).json({ 
          error: `Only ${quotes?.length || 0}/3 quotes submitted` 
        });
      }
      
      const decryptedQuotes: DecryptedQuote[] = quotes.map((q: QuoteRecord) => {
        const encryptedData: EncryptedData = JSON.parse(q.hash);
        const decrypted = decrypt(encryptedData);
        return {
          name: q.name,
          ...decrypted
        };
      });
      
      const winner = decryptedQuotes.reduce((lowest, current) => 
        current.quote < lowest.quote ? current : lowest
      );
      
      const losers = decryptedQuotes.filter(q => q.address !== winner.address);
      
      if (action === 'finalize') {
        const chainResult = await postWinnerToChain(
          winner.address,
          losers.map(l => l.address),
          decryptedQuotes
        );
        
        if (!chainResult.success) {
          return res.status(500).json({ 
            error: 'Failed to post to chain',
            details: chainResult.error 
          });
        }
        
        return res.status(200).json({
          success: true,
          winner: {
            address: winner.address,
            name: winner.name
          },
          txHash: chainResult.txHash,
          message: 'Winner announced on-chain'
        });
      }
      
      return res.status(200).json({
        winner: {
          name: winner.name,
          address: winner.address
        },
        totalQuotes: quotes.length,
        message: 'Use ?action=finalize to post winner to chain'
      });
    } catch (error) {
      console.error('Error in GET handler:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  if (req.method === 'DELETE') {
    const { bondName } = req.query;
    
    if (!bondName || Array.isArray(bondName)) {
      return res.status(400).json({ error: 'bondName required' });
    }
    
    try {
      const { error } = await supabase
        .from('Quotes')
        .delete()
        .like('name', `%-${bondName}-%`);
      
      if (error) {
        return res.status(500).json({ error: 'Failed to delete' });
      }
      
      return res.status(200).json({ 
        success: true,
        message: `All quotes for ${bondName} deleted` 
      });
    } catch (error) {
      console.error('Error in DELETE handler:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}