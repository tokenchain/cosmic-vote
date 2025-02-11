import config from '@/helpers/config';
import pkg from '@/../package.json';
export function shorten(str = '') {
    return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
}
export function jsonParse(input, fallback) {
    if (typeof input !== 'string') {
        return fallback || {};
    }
    try {
        return JSON.parse(input);
    }
    catch (err) {
        return fallback || {};
    }
}
export function clone(item) {
    return JSON.parse(JSON.stringify(item));
}
export function etherscanLink(str, type = 'address') {
    const network = config.network === 'homestead' ? '' : `${config.network}.`;
    return `https://${network}etherscan.io/${type}/${str}`;
}
export function lsSet(key, value) {
    return localStorage.setItem(`${pkg.name}.${key}`, JSON.stringify(value));
}
export function lsGet(key) {
    const item = localStorage.getItem(`${pkg.name}.${key}`);
    return jsonParse(item, '');
}
export function lsRemove(key) {
    return localStorage.removeItem(`${pkg.name}.${key}`);
}
export function formatProposal(proposal) {
    proposal.msg = jsonParse(proposal.msg, proposal.msg);
    if (proposal.msg.version === '0.1.0') {
        proposal.msg.payload.start = 1595088000;
        proposal.msg.payload.end = 1595174400;
        proposal.msg.payload.snapshot = 10484400;
        proposal.bpt_voting_disabled = '1';
    }
    return proposal;
}
export function formatProposals(proposals) {
    return Object.fromEntries(Object.entries(proposals).map(proposal => [
        proposal[0],
        formatProposal(proposal[1])
    ]));
}
