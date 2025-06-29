
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Shield, CreditCard, Smartphone, Building, Wallet, QrCode } from 'lucide-react';

interface PaymentGatewayProps {
  amount: number;
  onBack: () => void;
  onNext: () => void;
}

const PaymentGateway = ({ amount, onBack, onNext }: PaymentGatewayProps) => {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const upiApps = [
    { name: 'Google Pay', logo: '🟢' },
    { name: 'PhonePe', logo: '🟣' },
    { name: 'Paytm', logo: '🔵' },
    { name: 'BHIM', logo: '🟠' }
  ];

  const popularBanks = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'Bank of Baroda'
  ];

  const wallets = [
    { name: 'Paytm Wallet', icon: '💳' },
    { name: 'Amazon Pay', icon: '🛒' },
    { name: 'PhonePe Wallet', icon: '📱' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Secure Payment</h2>
        <p className="text-gray-600">Complete your payment to submit the verification request</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Choose Payment Method</CardTitle>
              <p className="text-sm text-gray-600">Location detected: India</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* UPI Payment */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="upi"
                    name="paymentMethod"
                    value="upi"
                    checked={selectedMethod === 'upi'}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <Label htmlFor="upi" className="flex items-center space-x-2 cursor-pointer">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">UPI Payment</span>
                  </Label>
                </div>
                
                {selectedMethod === 'upi' && (
                  <div className="ml-7 space-y-4">
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@paytm"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Popular UPI Apps</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {upiApps.map((app, index) => (
                          <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-50">
                            <span className="mr-1">{app.logo}</span>
                            {app.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                      <QrCode className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-blue-700">Or scan QR code to pay</span>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Cards */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={selectedMethod === 'card'}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </Label>
                </div>
                
                {selectedMethod === 'card' && (
                  <div className="ml-7 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Sample: **** **** **** 4532 (Visa)</p>
                  </div>
                )}
              </div>

              <Separator />

              {/* Net Banking */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="netbanking"
                    name="paymentMethod"
                    value="netbanking"
                    checked={selectedMethod === 'netbanking'}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <Label htmlFor="netbanking" className="flex items-center space-x-2 cursor-pointer">
                    <Building className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Net Banking</span>
                  </Label>
                </div>
                
                {selectedMethod === 'netbanking' && (
                  <div className="ml-7">
                    <Label htmlFor="bank">Select Bank</Label>
                    <Select onValueChange={setSelectedBank}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choose your bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {popularBanks.map((bank, index) => (
                          <SelectItem key={index} value={bank.toLowerCase().replace(/\s+/g, '-')}>
                            {bank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <Separator />

              {/* Wallets */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="wallet"
                    name="paymentMethod"
                    value="wallet"
                    checked={selectedMethod === 'wallet'}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <Label htmlFor="wallet" className="flex items-center space-x-2 cursor-pointer">
                    <Wallet className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Wallets</span>
                  </Label>
                </div>
                
                {selectedMethod === 'wallet' && (
                  <div className="ml-7">
                    <div className="grid grid-cols-1 gap-2">
                      {wallets.map((wallet, index) => (
                        <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <span className="text-lg">{wallet.icon}</span>
                          <span className="font-medium">{wallet.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹{amount.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Verification fee</span>
                    <span>₹2,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express processing</span>
                    <span>₹500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform fee</span>
                    <span>₹50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹549</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">256-bit Encryption</span>
                </div>
                <p className="text-xs text-gray-500">
                  Powered by Razorpay. Your payment information is secure and encrypted.
                </p>
                <a href="#" className="text-xs text-blue-600 hover:underline">
                  View Refund Policy
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button onClick={onBack} variant="outline" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Review
            </Button>
            <Button onClick={onNext} className="w-full bg-green-600 hover:bg-green-700 text-white">
              Pay Now ₹{amount.toLocaleString()}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
