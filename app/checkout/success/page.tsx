import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Mail, Package } from "lucide-react";
import { ClearCart } from "@/components/clear-cart";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

export default function SuccessPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <ClearCart />
      <div className="grid h-20 w-20 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
        <CheckCircle2 className="h-11 w-11" />
      </div>
      <h1 className="mt-6 text-4xl font-bold tracking-tight">Thank you!</h1>
      <p className="mt-3 text-muted">
        Your order is confirmed. We&apos;re placing it with our supplier and will
        get it shipped to you shortly.
      </p>

      <div className="glass glass-edge mt-8 w-full rounded-glass p-6 text-left">
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-5 w-5 text-accent" />
          <div>
            <p className="font-semibold">A receipt is on its way</p>
            <p className="text-sm text-muted">
              Stripe has emailed your payment confirmation.
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-start gap-3">
          <Package className="mt-0.5 h-5 w-5 text-accent" />
          <div>
            <p className="font-semibold">Shipping included</p>
            <p className="text-sm text-muted">
              No surprise fees — delivery was already part of your price.
            </p>
          </div>
        </div>
      </div>

      <Link
        href="/fragrances"
        className="mt-8 rounded-full bg-gradient-to-br from-accent to-accent-2 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-[1.02]"
      >
        Continue shopping
      </Link>
    </div>
  );
}
