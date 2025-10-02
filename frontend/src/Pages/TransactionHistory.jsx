import React, { useState, useEffect } from 'react';
import { apiurl } from '../api/axios';

const TransactionHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        const response = await fetch(`${apiurl}/api/user-payments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error((await response.json()).error || 'Failed to fetch transaction history');
        }

        const data = await response.json();
        setPayments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="pt-12 p-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="h-6 w-56 rounded bg-gray-200 animate-pulse" />
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {[...Array(6)].map((_, i) => (
                <li key={i} className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="h-4 w-40 rounded bg-gray-200 animate-pulse" />
                      <div className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
                      <div className="h-3 w-28 rounded bg-gray-200 animate-pulse" />
                    </div>
                    <div className="h-6 w-20 rounded-full bg-gray-200 animate-pulse" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-12 p-6 min-h-screen">
        <div className="max-w-2xl mx-auto rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          <p className="font-semibold">Error</p>
          <p className="mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-12 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Transaction History</h1>
        {payments.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-600">
            No transactions found.
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <li key={payment._id} className="p-5 hover:bg-gray-50 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-sm text-gray-600">Doctor</p>
                      <p className="text-lg font-semibold text-gray-900">Dr. {payment.doctorName}</p>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                        <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{payment.discountApplied ? '10% Discount Applied' : 'No Discount'}</span>
                      </div>
                    </div>
                    <span className="self-start sm:self-auto rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
                      ₹{payment.paymentAmount.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
