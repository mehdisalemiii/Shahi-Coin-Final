import React from 'react';
interface Props {
    showBoosts: boolean;
    openBoosts: () => void;
    onBoostPurchase: (cost: number) => void;
}
declare const Boosts: React.FC<Props>;
export default Boosts;
