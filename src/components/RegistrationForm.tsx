
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft } from 'lucide-react';
import { useChatbot, UserInfo, UserType } from '@/context/ChatbotContext';
import { validateRegistrationNumber, validateEmail, validatePhone, validateName } from '@/utils/validation';
import { toast } from 'sonner';

interface RegistrationFormProps {
  onBack: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onBack }) => {
  const { userInfo, setUserInfo, authenticate } = useChatbot();
  const [name, setName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get user type from context
  const userType = userInfo?.userType || null;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Validate name for all user types
    if (!validateName(name)) {
      newErrors.name = 'Please enter a valid name';
      isValid = false;
    }

    // Validate based on user type
    if (userType === 'faculty' || userType === 'student') {
      if (!validateRegistrationNumber(regNumber)) {
        newErrors.regNumber = 'Please enter a valid registration number (format: YYBRANCH#####)';
        isValid = false;
      }
    } else if (userType === 'visitor') {
      // For visitors, at least one contact method is required
      if (!email && !phone) {
        newErrors.contact = 'Please provide either email or phone number';
        isValid = false;
      } else {
        if (email && !validateEmail(email)) {
          newErrors.email = 'Please enter a valid email';
          isValid = false;
        }
        if (phone && !validatePhone(phone)) {
          newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    // Create user info object based on user type
    const userInfoData: UserInfo = {
      userType: userType as UserType,
      name,
      ...(userType === 'faculty' || userType === 'student' ? { regNumber } : {}),
      ...(userType === 'visitor' && email ? { email } : {}),
      ...(userType === 'visitor' && phone ? { phone } : {}),
    };

    // Update context with user info
    setUserInfo(userInfoData);
    
    // Authenticate the user (in a real app, this would make an API call)
    authenticate();
  };

  return (
    <div className="w-full max-w-md mx-auto py-8 px-4 animate-fade-in">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6" 
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {userType === 'faculty' && 'Faculty Registration'}
            {userType === 'student' && 'Student Registration'}
            {userType === 'visitor' && 'Visitor Information'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            {(userType === 'faculty' || userType === 'student') && (
              <div className="space-y-2">
                <Label htmlFor="regNumber">Registration Number</Label>
                <Input
                  id="regNumber"
                  placeholder="e.g., 23bai10979"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  className={errors.regNumber ? "border-destructive" : ""}
                />
                {errors.regNumber && (
                  <p className="text-sm text-destructive">{errors.regNumber}</p>
                )}
                <p className="text-xs text-muted-foreground">Format: YEAR BRANCH SIX DIGITS (e.g., 23bai10979)</p>
              </div>
            )}

            {userType === 'visitor' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                {errors.contact && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.contact}</AlertDescription>
                  </Alert>
                )}
              </>
            )}

            <Button 
              type="submit" 
              className="w-full bg-college-primary hover:bg-college-accent"
            >
              Continue
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          <p>Your information is kept secure and private</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegistrationForm;
