/*This class used to be named "Stock" and it is widely used accross the whole application,
 * hence many variables named "stock" are actually StockProfiles */

export class StockProfile {
    symbol : string;
    name: string;
    currency: string;
/* There are more data fields in CompanyProfile2Response but those are not relevant for current requirements */

    constructor(
        symbol :string,
        name: string,
        currency: string
    ) {
        this.symbol = symbol;
        this.name = name;
        this.currency = currency;
    }
}

