'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Lock } from 'lucide-react'

export function CreateRFBForm() {
  const [formData, setFormData] = useState({
    bankName: '',
    rfbId: '',
    isinCode: '',
    bondType: '',
    amount: '',
    maturityDate: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, bondType: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 shadow-xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <Lock className="w-5 h-5 text-slate-300" />
            </div>
            <h1 className="text-2xl font-bold text-white">Create Request for Bid</h1>
          </div>
          <p className="text-slate-400">Initiate a new bond RFB secured with Zero-Knowledge Proof technology</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bank Name and RFB ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="bankName" className="text-slate-300 mb-2 block">Bank Name</Label>
              <Input
                id="bankName"
                name="bankName"
                placeholder="Enter your bank name"
                value={formData.bankName}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50"
              />
            </div>
            <div>
              <Label htmlFor="rfbId" className="text-slate-300 mb-2 block">RFB Identifier</Label>
              <div className="flex gap-2">
                <Input
                  id="rfbId"
                  name="rfbId"
                  placeholder="e.g., RFB-2025-ABC1234"
                  value={formData.rfbId}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50"
                />
                <Button 
                  type="button"
                  variant="outline"
                  size="icon"
                  className="border-white/10 hover:bg-white/10"
                >
                  ↻
                </Button>
              </div>
            </div>
          </div>

          {/* ISIN Code */}
          <div>
            <Label htmlFor="isinCode" className="text-slate-300 mb-2 block">ISIN Code</Label>
            <Input
              id="isinCode"
              name="isinCode"
              placeholder="e.g., US912828XY45"
              value={formData.isinCode}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50"
            />
            <p className="text-xs text-slate-500 mt-1">12-character alphanumeric code</p>
          </div>

          {/* Bond Type */}
          <div>
            <Label htmlFor="bondType" className="text-slate-300 mb-2 block">Bond Type</Label>
            <Select value={formData.bondType} onValueChange={handleSelectChange}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select bond type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/10">
                <SelectItem value="vanilla">Vanilla Bond</SelectItem>
                <SelectItem value="exotic">Exotic Bond</SelectItem>
                <SelectItem value="government">Government Bond</SelectItem>
                <SelectItem value="corporate">Corporate Bond</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount and Maturity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="amount" className="text-slate-300 mb-2 block">Notional Amount (USD)</Label>
              <Input
                id="amount"
                name="amount"
                placeholder="e.g., 1000000"
                value={formData.amount}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50"
              />
            </div>
            <div>
              <Label htmlFor="maturityDate" className="text-slate-300 mb-2 block">Maturity Date</Label>
              <Input
                id="maturityDate"
                name="maturityDate"
                type="date"
                placeholder="mm/dd/yyyy"
                value={formData.maturityDate}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500/50"
              />
            </div>
          </div>

          {/* ZKP Alert */}
          <Alert className="bg-blue-500/10 border-blue-500/20">
            <Lock className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-300">
              All bid quotes will be encrypted using ZKP technology, ensuring complete confidentiality until all 3 bids are received.
            </AlertDescription>
          </Alert>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-black hover:bg-slate-900 text-white border border-white/10"
            >
              Create RFB
            </Button>
            <Button 
              type="button"
              variant="outline"
              className="flex-1 border-white/10 text-slate-300 hover:bg-white/5"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
