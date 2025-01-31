import React from 'react';

import Main from './Main';
import { mockProduct } from './ProductDetails';

const ProductDetails = () => {
    return (
        <section>
            <Main product={mockProduct} />
        </section>
    );
};

export default ProductDetails;