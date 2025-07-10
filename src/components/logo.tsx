import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <ShoppingCart className="h-7 w-7 text-primary" />
      <span className="text-2xl font-headline font-bold text-foreground">BizMart</span>
    </Link>
  );
}
