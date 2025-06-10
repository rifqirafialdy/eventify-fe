'use client';

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axiosInstance';
import PermissionWrapper from '../PermissionWrapper';
interface Ticket {
  ticketId: string;
  categoryName: string;
  price: number;
}

interface Schedule {
  scheduleId: string;
  tickets: Ticket[];
}

export default function BuyTicketForm({ schedule }: { schedule: Schedule }) {
  const [walletAmount, setWalletAmount] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const [discountEligible, setDiscountEligible] = useState(false);
  const router = useRouter();

 useEffect(() => {
  const fetchData = async () => {
    try {
      const walletRes = await axiosInstance.get('/api/referral');
      setWalletAmount(walletRes.data.walletAmount || 0);
    } catch (err) {
      console.error('Wallet not found or referral failed:', err);
      setWalletAmount(0); 
    }

    try {
      const discountRes = await axiosInstance.get('/api/transactions/check-discount-eligibility');
      setDiscountEligible(discountRes.data.discountEligible || false);
    } catch (err) {
      console.error('Discount eligibility check failed:', err);
      setDiscountEligible(false);
    }
  };

  fetchData();
}, []);


  const formik = useFormik({
    initialValues: {
      ticketId: '',
      quantity: 1,
    },
    validationSchema: Yup.object({
      ticketId: Yup.string().required('Select a ticket'),
      quantity: Yup.number().min(1).required(),
    }),
    onSubmit: async (values) => {
      try {
        await axiosInstance.post('/api/transactions/purchase', {
          scheduleId: schedule.scheduleId,
          ticketId: values.ticketId,
          quantity: values.quantity,
          usePoints,
        });

        alert('Ticket purchased successfully!');
        router.push('/');
      } catch  {
        alert( 'Purchase failed.');
      }
    },
  });

  const selectedTicket = schedule.tickets.find(
    (t) => t.ticketId === formik.values.ticketId
  );
  const quantity = formik.values.quantity;
  const basePrice = selectedTicket ? selectedTicket.price * quantity : 0;
  const referralDiscount = discountEligible ? basePrice * 0.1 : 0;
  const walletDiscount = usePoints ? Math.min(walletAmount, basePrice - referralDiscount) : 0;
  const finalPrice = basePrice - referralDiscount - walletDiscount;

  return (
    <PermissionWrapper screen="TICKETS" action="BUY">
      <form onSubmit={formik.handleSubmit} className="space-y-4 mt-8">
        <div>
          <label className="block font-semibold">Choose Ticket</label>
          <select
            name="ticketId"
            value={formik.values.ticketId}
            onChange={formik.handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select --</option>
            {schedule.tickets.map((t) => (
              <option key={t.ticketId} value={t.ticketId}>
                {t.categoryName} - Rp {t.price.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="usePoints"
            checked={usePoints}
            onChange={() => setUsePoints(!usePoints)}
          />
          <label htmlFor="usePoints">
            Use wallet points (Balance: Rp {walletAmount.toLocaleString('id-ID')})
          </label>
        </div>

       <div className="bg-gray-100 p-4 rounded">
  <p>Original Price: Rp {basePrice.toLocaleString('id-ID')}</p>
  <p>Referral Discount (10%): -Rp {referralDiscount.toLocaleString('id-ID')}</p>
  {discountEligible ? (
    <p className="text-sm text-green-600">You’re eligible for a 10% referral discount.</p>
  ) : (
    <p className="text-sm text-red-500">
      You’re not eligible for the referral discount. It only applies to your first referred purchase.
    </p>
  )}
  <p>Wallet Discount: -Rp {walletDiscount.toLocaleString('id-ID')}</p>
  <p className="font-bold text-green-700">
    Final Total: Rp {finalPrice.toLocaleString('id-ID')}
  </p>
</div>


        <button
          type="submit"
          className="px-6 py-3 bg-amber-500 text-white rounded-lg"
        >
          Buy Ticket
        </button>
      </form>
    </PermissionWrapper>
  );
}
