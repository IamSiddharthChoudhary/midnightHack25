import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

interface QuoteSubmission {
  userName: string;
  bondName: string;
  quote: number;
  address: string;
}

interface EncryptedData {
  encrypted: string;
  iv: string;
  authTag: string;
}

interface DecryptedData {
  quote: number;
  address: string;
}

interface QuoteRecord {
  name: string;
  hash: string;
}

interface DecryptedQuote {
  name: string;
  quote: number;
  address: string;
}

interface ApiResponse<T = any> {
  success?: boolean;
  error?: string;
  quoterNumber?: number;
  name?: string;
  winner?: {
    name: string;
    address: string;
  };
  totalQuotes?: number;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const ALGORITHM = 'aes-256-gcm';
const SECRET_KEY = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
const IV_LENGTH = 16;

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === 'POST') {
    const { userName, bondName, quote, address }: QuoteSubmission = req.body;
    
    if (!userName || !bondName || !quote || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
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
      
      const dataToEncrypt: DecryptedData = { quote, address };
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
        name 
      });
    } catch (error) {
      console.error('Error in POST handler:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  if (req.method === 'GET') {
    const { bondName } = req.query;
    
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
        return res.status(400).json({ error: 'Not all quotes submitted yet' });
      }
      
      const decryptedQuotes: DecryptedQuote[] = quotes.map((q: QuoteRecord) => {
        const encryptedData: EncryptedData = JSON.parse(q.hash);
        const decrypted = decrypt(encryptedData);
        return {
          name: q.name,
          quote: decrypted.quote,
          address: decrypted.address
        };
      });
      
      const winner = decryptedQuotes.reduce((lowest, current) => 
        current.quote < lowest.quote ? current : lowest
      );
      
      return res.status(200).json({
        winner: {
          name: winner.name,
          address: winner.address
        },
        totalQuotes: quotes.length
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
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error in DELETE handler:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}