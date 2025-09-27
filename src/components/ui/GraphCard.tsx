"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { setTimeframe } from "@/store/slices/uiSlice";

interface GraphCardProps {
  title: string;
  children?: React.ReactNode;
}

export function GraphCard({ title, children }: GraphCardProps) {
  const dispatch = useDispatch();
  const { selectedTimeframe } = useSelector((state: RootState) => state.ui);

  const timeframes = [
    { key: "weekly", label: "WEEKLY" },
    { key: "monthly", label: "MONTHLY" },
    { key: "yearly", label: "YEARLY" },
  ] as const;

  const handleTimeframeChange = (
    timeframe: "weekly" | "monthly" | "yearly"
  ) => {
    dispatch(setTimeframe(timeframe));
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="font-bold text-gray-800 border-b pb-2">
          {title}
        </CardTitle>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 ml-auto">
            {timeframes.map((timeframe) => (
              <Button
                key={timeframe.key}
                variant={
                  selectedTimeframe === timeframe.key ? "default" : "outline"
                }
                size="sm"
                onClick={() => handleTimeframeChange(timeframe.key)}
                className="text-xs"
              >
                {timeframe.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {children || (
          <div className="h-72 flex items-center justify-center text-gray-400 text-sm">
            [Graph Placeholder]
          </div>
        )}
      </CardContent>
    </Card>
  );
}
