# BondBid ZKP

A privacy-preserving bond trading platform built on **Midnight Chain** using **Zero-Knowledge Proofs** to enable secure, transparent RFB (Request for Bid) auctions.

## The Idea

**Problem**: In traditional bond trading, all bidders can see competing quotes, compromising bidder confidentiality and creating unfair competitive advantages.

**Solution**: BondBid ZKP uses Zero-Knowledge Proofs to guarantee:
- **Winners know they won** without revealing their winning price to losers
- **Losers know they lost** without knowing the winning price
- **Complete privacy** until all 3 quotes are submitted
- **Guaranteed fairness** - the lowest price always wins, cryptographically verified

This ensures institutional-grade privacy while maintaining full transparency and auditability post-auction.

## How It Works

1. **Create RFB** - Issuer initiates a Request for Bid with bond details (ISIN, amount, maturity date)
2. **Collect Quotes** - Up to 3 bidders submit encrypted quotes using ZKP technology
3. **Determine Winner** - System proves the lowest bidder won without revealing any prices
4. **Closed Bids** - All results published with cryptographic proof of fairness

## Tech Stack

- **Blockchain**: Midnight Chain (privacy-focused smart contracts)
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Cryptography**: Zero-Knowledge Proofs (ZKP circuits)
- **UI**: Shadcn/UI components with custom animations

## Getting Started

### Installation

\`\`\`bash
git clone <repository-url>
cd bondbid-zkp
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

### Build & Deploy

\`\`\`bash
npm run build
npm start
\`\`\`

Deploy to Vercel with one click:
\`\`\`bash
vercel
\`\`\`

## Project Structure

\`\`\`
app/
├── page.tsx                    # Landing page
├── create-rfb/page.tsx         # Create new RFB
├── open-bids/page.tsx          # View active auctions
└── closed-bids/page.tsx        # View results & history

components/
├── navigation.tsx              # Main nav bar
├── hero-section.tsx            # Landing hero
├── create-rfb-form.tsx         # RFB creation
├── open-bids-section.tsx       # Active auctions UI
├── closed-bids-section.tsx     # Results UI
└── bg-component.tsx            # Three.js background animation
\`\`\`

## Pages

- **Home** - Platform overview and value proposition
- **Create RFB** - Form to initiate new bond auctions
- **Open Bids** - List of active RFBs awaiting quotes
- **Closed Bids** - Historical auctions with verified results

## Design

- Dark, professional aesthetic reflecting institutional finance
- Glassmorphism effects for visual depth
- Responsive mobile-first design
- Three.js fluid background for immersive feel

## Key Features

✅ Zero-Knowledge Proof protection for all bids  
✅ Privacy-preserving auction mechanics  
✅ Complete bid confidentiality until closure  
✅ Cryptographic proof of lowest bidder  
✅ Full transparency and auditability post-auction  
✅ Built for Vanilla and Exotic Bonds  

## Next Steps

- Integrate Midnight Chain smart contracts for ZKP circuit verification
- Connect backend for persistent bid storage
- Add authentication for institutional users
- Implement real-time bidding notifications
- Build admin dashboard for auction monitoring

## License

Proprietary - All rights reserved

---

**Secure Bond Trading with Privacy. Built on Midnight Chain.**
