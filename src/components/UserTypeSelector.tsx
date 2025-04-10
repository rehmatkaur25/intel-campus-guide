
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserType, useChatbot } from '@/context/ChatbotContext';
import { GraduationCap, UserCog, User } from 'lucide-react';

const UserTypeSelector: React.FC = () => {
  const { setUserType } = useChatbot();

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4 animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6">Welcome to V-BOT</h2>
      <p className="text-center text-muted-foreground mb-8">
        Please select your user type to continue
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-college-primary">
          <CardHeader className="text-center">
            <GraduationCap className="mx-auto h-12 w-12 text-college-primary mb-2" />
            <CardTitle>Student</CardTitle>
            <CardDescription>Current students of the college</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-center">
              Access information about courses, exams, and college resources
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-college-primary hover:bg-college-accent" 
              onClick={() => handleUserTypeSelect('student')}
            >
              Continue as Student
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-college-primary">
          <CardHeader className="text-center">
            <UserCog className="mx-auto h-12 w-12 text-college-primary mb-2" />
            <CardTitle>Faculty</CardTitle>
            <CardDescription>Teaching and administrative staff</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-center">
              Access faculty resources, schedules, and administrative tools
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-college-primary hover:bg-college-accent" 
              onClick={() => handleUserTypeSelect('faculty')}
            >
              Continue as Faculty
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-college-primary">
          <CardHeader className="text-center">
            <User className="mx-auto h-12 w-12 text-college-primary mb-2" />
            <CardTitle>Visitor</CardTitle>
            <CardDescription>Prospective students or guests</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-center">
              Learn about our college, programs, and admission process
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-college-primary hover:bg-college-accent" 
              onClick={() => handleUserTypeSelect('visitor')}
            >
              Continue as Visitor
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserTypeSelector;
