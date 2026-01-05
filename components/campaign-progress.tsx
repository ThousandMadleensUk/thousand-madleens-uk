"use client";

import { useState, useEffect } from "react";
import { Loader2, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CampaignProgressProps {
  campaignId?: number;
}

export default function CampaignProgress({ campaignId = 143268 }: CampaignProgressProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      const query = `
        query getCampaignCollected($id: ID!) {
          campaign(id: $id) {
            collected {
              amount
            }
            target {
              amount
              currency
              currencyNode {
                symbol
              }
            }
          }
        }
      `;

      try {
        const response = await fetch("https://chuffed.org/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            variables: { id: campaignId },
          }),
        });

        const result = await response.json();
        setData(result.data.campaign);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-3 text-gray-600">Loading campaign progress...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-red-600 font-medium">Unable to load campaign data</p>
        <p className="text-sm text-red-500 mt-1">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  // Round down to nearest pound
  const collected = Math.floor(parseInt(data.collected.amount) / 100);
  const target = Math.floor(parseInt(data.target.amount) / 100);
  const symbol = data.target.currencyNode.symbol;
  const percentage = Math.min((collected / target) * 100, 100);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg border-2 border-green-200 shadow-lg overflow-hidden">
      {/* Banner Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src="/donate.jpg"
          alt="Support the campaign"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <div className="mb-3 flex justify-between items-baseline">
          <span className="text-2xl font-bold text-black">
            {symbol}{collected.toLocaleString()}
          </span>
          <span className="text-gray-600">
            of {symbol}{target.toLocaleString()}
          </span>
        </div>

      {/* Progress bar */}
      <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-green-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

        {/* Donate button */}
        <Link href="https://chuffed.org/project/143268-uk-delegation-1000-madleens" target="_blank" className="block">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-bold">
            <HandHeart className="mr-2 h-5 w-5" />
            Donate Now
          </Button>
        </Link>
      </div>
    </div>
  );
}