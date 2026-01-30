import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Custom Parameter Type Definition
export type CustomParamInfo = {
  object: string;
  key: string;
  comment: string;
  example: string;
  default: string;
};

// Parameters Info Constant (Shared with frontend)
export const PARAMS_INFO: CustomParamInfo[] = [
  { object: 'Settings', key: 'ssl', comment: 'Endpoint SSL', example: '0, 1', default: '1' },
  { object: 'Settings', key: 'ep', comment: 'Data center', example: 'eu-1, asia-1', default: 'eu-1' },
  { object: 'Settings', key: 'ex', comment: 'Exchange alias', example: 'test, smaato, doubleclick, ...', default: 'test' },
  { object: 'Settings', key: 'exbs', comment: 'BidSwitch Exchange alias', example: 'adform, inmobi, teads...', default: '' },
  { object: 'Settings', key: 'env', comment: 'Environment', example: 'app, site', default: 'site' },
  { object: 'Settings', key: 'type', comment: 'Creative type', example: 'banner, native, video, audio', default: 'banner' },
  { object: 'Settings', key: 'pmp', comment: 'Private marketplace', example: '0, 1', default: '0' },
  { object: 'Settings', key: 'audit', comment: 'No bid reason enforcement', example: '0, 1', default: '0' },
  { object: 'Settings', key: 'test', comment: 'Test bid request', example: '0, 1', default: '0' },
  { object: 'Settings', key: 'win', comment: 'Win notification enforcement', example: '0, 1', default: '1' },
  { object: 'BidRequest', key: 'at', comment: 'Auction type', example: '1, 2', default: '1' },
  { object: 'BidRequest', key: 'badv', comment: 'Blocked advertiser domains', example: 'example.com, test.com, ...', default: 'example.com' },
  { object: 'BidRequest', key: 'bapp', comment: 'Blocked advertiser bundles', example: 'com.example, com.test, ...', default: 'com.example' },
  { object: 'BidRequest', key: 'bcat', comment: 'Blocked content categories', example: 'IAB1, IAB1-1, ...', default: 'IAB26' },
  { object: 'BidRequest', key: 'cur', comment: 'Currency', example: 'USD, EUR, ...', default: 'USD' },
  { object: 'BidRequest', key: 'tmax', comment: 'Max time for bid request', example: '200, 300, ...', default: '300' },
  { object: 'BidRequest', key: 'wlang', comment: 'Working language', example: 'en, fr, ...', default: 'en' },
  { object: 'BidRequest.device', key: 'ip', comment: 'Device IPv4 Address', example: 'IPv4 Address', default: '' },
  { object: 'BidRequest.device', key: 'ipv6', comment: 'Device IPv6 Address', example: 'IPv6 Address', default: '' },
  { object: 'BidRequest.device', key: 'city', comment: 'Device city', example: 'Vilnius, Chicago, ...', default: '' },
  { object: 'BidRequest.device', key: 'lat', comment: 'Device latitude', example: '1.23', default: '' },
  { object: 'BidRequest.device', key: 'lon', comment: 'Device longitude', example: '2.34', default: '' },
  { object: 'BidRequest.device', key: 'js', comment: 'JavaScript enabled', example: '0, 1', default: '1' },
  { object: 'BidRequest.imp', key: 'bf', comment: 'Bid floor', example: '0.01, 0.02, ...', default: '0.01' },
  { object: 'BidRequest.imp', key: 'tagid', comment: 'Tag ID', example: '1, 2, ...', default: 'rand(1,2)' },
  { object: 'BidRequest.imp', key: 'instl', comment: 'Intestitial', example: '0, 1', default: '0' },
  { object: 'BidRequest.imp.pmp', key: 'dealid', comment: 'Deal ID', example: 'String', default: 'test_deal_1' },
  { object: 'BidRequest.imp.pmp', key: 'dealat', comment: 'Deal auction type', example: '0, 1', default: '1' },
  { object: 'BidRequest.imp.pmp', key: 'dealbf', comment: 'Deal bid floor', example: '0.01, 0.02, ...', default: '0.05' },
  { object: 'BidRequest.imp.pmp', key: 'dealpa', comment: 'Deal preferred auction', example: '0, 1', default: '1' },
  { object: 'BidRequest.banner/video', key: 'w', comment: 'Width', example: 'Integer', default: '300' },
  { object: 'BidRequest.banner/video', key: 'h', comment: 'Height', example: 'Integer', default: '250' },
  { object: 'BidRequest.banner/video', key: 'pos', comment: 'Ad position', example: '1-7', default: '1' },
  { object: 'BidRequest.app', key: 'appid', comment: 'App ID', example: 'MD5 hash of app bundle', default: "md5('com.eskimi.demo')" },
  { object: 'BidRequest.app', key: 'bundle', comment: 'App bundle ID', example: 'com.eskimi.demo, com.eskimi.demo2', default: 'com.eskimi.demo' },
  { object: 'BidRequest.app', key: 'cat', comment: 'App category', example: 'IAB1, IAB1-1, ...', default: 'IAB1' },
  { object: 'BidRequest.app', key: 'pubid', comment: 'Publisher ID', example: 'String', default: '111' },
  { object: 'BidRequest.app', key: 'pubname', comment: 'Publisher name', example: 'String', default: 'Eskimi' },
  { object: 'BidRequest.site', key: 'siteid', comment: 'Site ID', example: 'MD5 hash of site domain', default: "md5('demo.eskimi.com')" },
  { object: 'BidRequest.site', key: 'domain', comment: 'Site domain', example: 'demo.eskimi.com, ...', default: 'demo.eskimi.com' },
  { object: 'BidRequest.site', key: 'page', comment: 'Page URL', example: 'URL', default: '' },
  { object: 'BidRequest.site', key: 'cat', comment: 'Site category', example: 'IAB1, IAB1-1, ...', default: 'IAB1' },
  { object: 'BidRequest.site', key: 'pubid', comment: 'Publisher ID', example: 'String', default: '111' },
  { object: 'BidRequest.site', key: 'pubname', comment: 'Publisher name', example: 'String', default: 'Eskimi' },
  { object: 'BidRequest.regs', key: 'coppa', comment: "Children's Privacy Act", example: '0, 1', default: '0' },
  { object: 'BidRequest.user', key: 'uid', comment: 'User ID', example: '0, 1', default: '1' },
  { object: 'BidRequest.user', key: 'eids', comment: 'External user IDs', example: '0, 1', default: '0' }
];

export const CONSENT_STRINGS = {
  acceptedAll: 'CQGRA8sQGRA8sAcAAAENCZCMAP_AAH_AABaYGXQAgF5gMuAy6AEAvMBlwAA.II7Nd_X__b_9n-_7_6ft0eY1f9_r37uQzDhfNs-8F3L_W_LwX32E7NF36tq4KmR4ku1bBIQNtHMnUDUmxaolVrzHsak2cpyNKJ_JkknsZe2dYGF9Pn9lD-YKZ7_5_9_f52T_9_9_-39z3_9f___dv_-__-vjf_599n_v9fV_78_Kf9______-____________8A',
  acceptedNecessary: 'CQF_ZFyQF_ZFyAcAAAENCZCMAP_AAH_AABaYGXQAQGXAZdABAZcAAA.II7Nd_X__bX9n-_7_6ft0eY1f9_r37uQzDhfNs-8F3L_W_LwX32E7NF36tq4KmR4ku1bBIQNtHMnUDUmxaolVrzHsak2cpyNKJ_JkknsZe2dYGF9Pn9lD-YKZ7_5_9_f52T_9_9_-39z3_9f___dv_-__-vjf_599n_v9fV_78_Kf9______-____________8A'
};
