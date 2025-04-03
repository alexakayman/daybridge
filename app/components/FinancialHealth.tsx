"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreditScoreIndicator from "./charts/CreditScore";
import React from "react";

interface FinancialHealthProps {
  // Add any props if needed
}

export default function FinancialHealth({}: FinancialHealthProps): JSX.Element {
  return (
    <>
      <div>
        <h2 className="mb-2">Financial Health</h2>
        <Tabs
          defaultValue="transunion"
          className="w-full border-none shadow-none h-auto"
        >
          <TabsContent value="experian">
            <CreditScoreIndicator score={720} />
          </TabsContent>
          <TabsContent value="transunion">
            <CreditScoreIndicator score={743} />
          </TabsContent>
          <TabsContent value="equifax">
            <CreditScoreIndicator score={738} />
          </TabsContent>
          <TabsList>
            <TabsTrigger value="experian">Experian</TabsTrigger>
            <TabsTrigger value="transunion">TransUnion</TabsTrigger>
            <TabsTrigger value="equifax">Equifax</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card className="border-none shadow-none">
        <CardHeader>
          <h2>Card Usage</h2>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">Olivia Martin</p>
              <p className="text-sm text-muted-foreground">
                olivia.martin@email.com
              </p>
            </div>
            <div className="ml-auto font-medium">+$1,999.00</div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/02.png" alt="Avatar" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">Jackson Lee</p>
              <p className="text-sm text-muted-foreground">
                jackson.lee@email.com
              </p>
            </div>
            <div className="ml-auto font-medium">+$39.00</div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/03.png" alt="Avatar" />
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                Isabella Nguyen
              </p>
              <p className="text-sm text-muted-foreground">
                isabella.nguyen@email.com
              </p>
            </div>
            <div className="ml-auto font-medium">+$299.00</div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/04.png" alt="Avatar" />
              <AvatarFallback>WK</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">William Kim</p>
              <p className="text-sm text-muted-foreground">will@email.com</p>
            </div>
            <div className="ml-auto font-medium">+$99.00</div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarImage src="/avatars/05.png" alt="Avatar" />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">Sofia Davis</p>
              <p className="text-sm text-muted-foreground">
                sofia.davis@email.com
              </p>
            </div>
            <div className="ml-auto font-medium">+$39.00</div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
