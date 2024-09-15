    Cities:
            query GetCities($search: String, $page: Int!, $limit: Int!) {
        cities(search: $search, page: $page, limit: $limit) {
            id
            name
            region {
            id
            name
            }
        }
        }

        query GetCity($id: Int!) {
        city(id: $id) {
            id
            name
            region {
            id
            name
            }
        }
        }

        mutation CreateCity($name: String!, $regionId: Int!) {
        createCity(name: $name, regionId: $regionId) {
            id
            name
        }
        }

        mutation UpdateCity($id: Int!, $name: String!, $regionId: Int!) {
        updateCity(id: $id, name: $name, regionId: $regionId) {
            id
            name
        }
        }

        mutation RemoveCity($id: Int!) {
        removeCity(id: $id)
        }

    Countries:

        query GetCountries($search: String, $page: Int!, $limit: Int!) {
        countries(search: $search, page: $page, limit: $limit) {
            id
            name
            alpha2
            alpha3
            language {
            id
            name
            }
        }
        }

        query GetCountry($id: Int!) {
        country(id: $id) {
            id
            name
            alpha2
            alpha3
            language {
            id
            name
            }
        }
        }

        mutation CreateCountry($name: String!, $alpha2: String!, $alpha3: String!, $languageId: Int!) {
        createCountry(name: $name, alpha2: $alpha2, alpha3: $alpha3, languageId: $languageId) {
            id
            name
            alpha2
            alpha3
        }
        }

        mutation UpdateCountry($id: Int!, $name: String, $alpha2: String, $alpha3: String, $languageId: Int) {
        updateCountry(id: $id, name: $name, alpha2: $alpha2, alpha3: $alpha3, languageId: $languageId) {
            id
            name
            alpha2
            alpha3
        }
        }

        mutation RemoveCountry($id: Int!) {
        removeCountry(id: $id)
        }

    Currencies:

        query GetAllCurrencies($search: String, $page: Int!, $limit: Int!) {
        Currencys(search: $search, page: $page, limit: $limit) {
            id
            name
            code
        }
        }

        query GetCurrencyById($id: Int!) {
        Currency(id: $id) {
            id
            name
            code
        }
        }

        mutation CreateCurrency($name: String!, $code: String!) {
        createCurrency(name: $name, code: $code) {
            id
            name
            code
        }
        }

        mutation UpdateCurrency($id: Int!, $name: String!, $code: String!) {
        updateCurrency(id: $id, name: $name, code: $code) {
            id
            name
            code
        }
        }

        mutation RemoveCurrency($id: Int!) {
        removeCurrency(id: $id)
        }

    Languages:

        query GetAllLanguages($search: String, $page: Int!, $limit: Int!) {
        languages(search: $search, page: $page, limit: $limit) {
            id
            name
        }
        }

        query GetLanguageById($id: Int!) {
        language(id: $id) {
            id
            name
        }
        }

        mutation CreateLanguage($name: String!) {
        createlanguage(name: $name) {
            id
            name
        }
        }

        mutation UpdateLanguage($id: Int!, $name: String!) {
        updatelanguage(id: $id, name: $name) {
            id
            name
        }
        }

        mutation RemoveLanguage($id: Int!) {
        removelanguage(id: $id)
        }

    Regions:

        query GetAllRegions($search: String, $page: Int!, $limit: Int!) {
        regions(search: $search, page: $page, limit: $limit) {
            id
            name
            country {
            id
            name
            }
        }
        }

        query GetRegionById($id: Int!) {
        region(id: $id) {
            id
            name
            country {
            id
            name
            }
        }
        }

        mutation CreateRegion($name: String!, $countryId: Int!) {
        createRegion(name: $name, countryId: $countryId) {
            id
            name
            country {
            id
            name
            }
        }
        }

        mutation UpdateRegion($id: Int!, $name: String!, $countryId: Int!) {
        updateRegion(id: $id, name: $name, countryId: $countryId) {
            id
            name
            country {
            id
            name
            }
        }
        }

        mutation RemoveRegion($id: Int!) {
        removeRegion(id: $id)
        }

    Banks:

        query GetAllBanks($search: String, $page: Int!, $limit: Int!) {
        banks(search: $search, page: $page, limit: $limit) {
            id
            name
            treasury
            location {
            id
            name
            }
            currencies {
            id
            name
            }
        }
        }

        query GetBankById($id: Int!) {
        bank(id: $id) {
            id
            name
            treasury
            location {
            id
            name
            }
            currencies {
            id
            name
            }
        }
        }

        mutation CreateBank(
        $name: String!,
        $locationId: Int!,
        $treasury: Float!,
        $special: String,
        $currenciesId: [Int!]!
        ) {
        createBank(name: $name, locationId: $locationId, treasury: $treasury, special: $special, currenciesId: $currenciesId) {
            id
            name
            treasury
            location {
            id
            name
            }
            currencies {
            id
            name
            }
        }
        }

        mutation UpdateBank(
        $id: Int!,
        $name: String!,
        $locationId: Int!,
        $treasury: Float!,
        $special: String,
        $currenciesId: [Int!]!
        ) {
        updateBank(id: $id, name: $name, locationId: $locationId, treasury: $treasury, special: $special, currenciesId: $currenciesId) {
            id
            name
            treasury
            location {
            id
            name
            }
            currencies {
            id
            name
            }
        }
        }

        mutation RemoveBank($id: Int!) {
        removeBank(id: $id)
        }
