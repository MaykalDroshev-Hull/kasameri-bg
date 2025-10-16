// app/product/[id]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';

const ProductPage = () => {
  const params = useParams();
  const productId = params.id as string;

  return <ProductDetail productId={productId} />;
};

export default ProductPage;
