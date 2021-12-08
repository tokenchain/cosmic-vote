import merge from 'lodash/merge';
import { clone } from '@/helpers/utils';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import config from '@/helpers/config';
import queries from '@/helpers/queries.json';
queries.custom = {};
export async function request(key, params = {}) {
    let query = merge(clone(queries[key]), clone(params));
    query = jsonToGraphQLQuery({ query });
    const res = await fetch(config.subgraphUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });
    const { data } = await res.json();
    return data || {};
}
