'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axiosInstance';
import dayjs from 'dayjs';
type ReferralPoint = {
  amount: number;
  expiresAt: string;
  bookTypeCode :string;
};

type WalletData = {
  referralNumber: string;
  walletAmount: number;
  points: ReferralPoint[];
};

export default function WalletPage() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await axiosInstance.get<WalletData>('/api/referral');
        setWallet(res.data);
      } catch (err: unknown) {
 if (
          typeof err === "object" &&
          err !== null &&
          "response" in err &&
          (err as { response?: { status?: number } }).response?.status === 404
        ) {
  
  } else {
    setError("Failed to load referral info");
  }
}

    };

    fetchWallet();
  }, []);

  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!wallet) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">My Wallet</h1>

      <div className="bg-gray-100 p-4 rounded-md">
        <p><strong>Referral Number:</strong> {wallet.referralNumber}</p>
        <p><strong>Total Wallet Amount:</strong> Rp {wallet.walletAmount.toLocaleString()}</p>
      </div>

      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-2">Active Points</h2>
        {wallet.points.length === 0 ? (
          <p>No active points.</p>
        ) : (
          <ul className="space-y-2">
            {wallet.points.map((point, index) => (
              <li key={index} className="flex justify-between border-b pb-1">
                <span>{point.amount.toLocaleString()} points</span>
                <span>{point.bookTypeCode.toLocaleString()}</span>
                <span className="text-sm text-gray-500">Expires on {dayjs(point.expiresAt).format('DD MMM YYYY, HH:mm')}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
