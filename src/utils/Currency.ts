
export const formatCurrency = (amount: number, currencyCode: string = "USD"): string => {
    // 1. Handle India
    if (currencyCode.toUpperCase() === "INR") {
        return `Rs ${amount.toLocaleString('en-IN')}`;
    }

    // 2. Handle USA (Default)
    return `$${amount.toLocaleString('en-US')}`;
};