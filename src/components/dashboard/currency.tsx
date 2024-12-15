"use client";
import axios from "axios";
import { Receipt } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

function Currency() {
  const session = useSession();

  const [currencyCount, setCurrencyCount] = useState(0);
  useEffect(() => {
    async function fetchCurrency() {
      const userdata = await axios.get("/api/my-currency");
      const currentUser = userdata.data;
      const currencyCount = currentUser?.currency || 0;
      setCurrencyCount(currencyCount);
    }
    fetchCurrency();
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" className="h-12 w-20">
            <Receipt className="h-10 w-10" />
            {currencyCount}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Only One at a time</p>
          <i>That&apos;s what she said</i>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default Currency;
