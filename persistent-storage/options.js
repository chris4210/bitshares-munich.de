'use strict';

module.exports = {
    app_title: 'bitshares-munich',
    http_port: '8081',
    http_host: 'localhost',
    winston_log_level: 'debug',
    price_list_metadata: [
        {key: 'EUR', img_src: 'img/bitEUR.png', width: 15, height: 15, alt: "BTS/EUR", border: 0, label: 'SURPRESS'},
        {
            key: 'bts/eur',
            img_src: 'img/bitBTS.png',
            width: 15,
            height: 15,
            alt: "BTS_BTC/EUR",
            border: 0,
            label: 'BTS/EUR'
        },
        {
            key: 'bitusd/eur',
            img_src: 'img/bitUSD.png',
            width: 15,
            height: 15,
            alt: "bitUSD",
            border: 0,
            label: 'bitUSD/EUR'
        },
        {
            key: 'bitSILVER_BTC',
            img_src: 'img/bitSILV.png',
            width: 15,
            height: 15,
            alt: "bitSILV",
            border: 0,
            label: 'bitSILV/EUR'
        },
        {
            key: 'bitGOLD_BTC',
            img_src: 'img/bitGOLD.png',
            width: 15,
            height: 15,
            alt: "bitGOLD",
            border: 0,
            label: 'bitGOLD/EUR'
        },
        {
            key: 'bitCNY_BTC',
            img_src: 'img/bitCNY.png',
            width: 15,
            height: 15,
            alt: "bitCNY",
            border: 0,
            label: 'bitCNY/EUR'
        },
        {
            key: 'biteur/eur',
            img_src: 'img/bitEUR.png',
            width: 15,
            height: 15,
            alt: "bitEUR",
            border: 0,
            label: 'bitEUR/EUR'
        },
        {key: 'BTC_BTS', img_src: 'img/bitBTS.png', width: 15, height: 15, alt: "BTC_BTS", border: 0, label: 'BTC_BTS'}
    ],
    datasources: {
       /* json_api: {
            bitsharesblocks: {
                feed_name: 'bitsharesblocks',
                feed_url: 'https://cryptofresh.com/api/cmc',
                polling_interval_seconds: 7,
                instructions: 'these are priced in bitshares, must take value from source and divide by BTS/EUR',
                whitelist: [
                    'blackmagic',
                    'EUR',
                    'BTC'
                ],
                blacklist: [
                    'blackmagic',
                    'BTS',
                    'GAS',
                    'DIESEL',
                    'KRW',
                    'OIL',
                    'SILVER',
                    'GOLD',
                    'TRY',
                    'SGD',
                    'HKD',
                    'RUB',
                    'SEK',
                    'NZD',
                    'CNY',
                    'CAD',
                    'CHF',
                    'AUD',
                    'GBP',
                    'JPY',
                    'NOTE',
                    'TESTME',
                    'BANCOR',
                    'NASDAQC',
                    'HANGSENG',
                    'NIKKEI',
                    'SHENZHEN',
                    'SHANGHAI',
                    'MXN',
                    'USD',
                    'CROWDFUN',
                    'DRAGON',
                    'SERVICE',
                    'BTCSHA'
                ]
            },
            metaexchange: {
                feed_name: 'metaexchange',
                feed_url: 'http://metaexchange.info/api/1/getAllMarkets',
                polling_interval_seconds: 7,
                instructions: 'read as BTC per bitCNY these are btc prices. must take the value from source and multiply times euros per btc',
                whitelist: [
                    'blackmagic',
                    'BTS_BTC',
                    'bitUSD_BTC',
                    'bitSILVER_BTC',
                    'bitGOLD_BTC',
                    'bitCNY_BTC',
                    'bitBTC_BTC',
                    'bitEUR_BTC'
                ],
                blacklist: [
                    'BTC_bitCNY',
                    'ETH_BTC',
                    'NXT_BTC'
                ]
            },
            ccedk: {
                feed_name: 'ccedk',
                feed_host: 'www.ccedk.com',
                feed_path: '/api/v1/stats/marketdepthfull',
                polling_interval_seconds: 7,
                instructions: '',
                whitelist: [
                    'blackmagic',
                    'biteur/eur',
                    'bitusd/eur',
                    'bts/eur'
                ],
                blacklist: [
                    'blackmagic',
                    'ltc/btc',
                    'btc/usd',
                    'ltc/usd',
                    'ltc/eur',
                    'ltc/gbp',
                    'ltc/dkk',
                    'btc/eur',
                    'btc/gbp',
                    'btc/dkk',
                    'ppc/ltc',
                    'ppc/btc',
                    'ppc/usd',
                    'ppc/eur',
                    'ppc/gbp',
                    'ppc/dkk',
                    'nxt/dkk',
                    'nxt/ltc',
                    'nxt/btc',
                    'nxt/usd',
                    'nxt/gbp',
                    'nxt/eur',
                    'ltc/rub',
                    'btc/rub',
                    'ppc/rub',
                    'nxt/rub',
                    'blk/usd',
                    'blk/eur',
                    'blk/btc',
                    'blk/dkk',
                    'nbt/usd',
                    'nbt/btc',
                    'nbt/ppc',
                    'nbt/eur',
                    'bts/btc',
                    'bts/ltc',
                    'bts/ppc',
                    'bts/nxt',
                    'bts/usd',
                    'bts/dkk',
                    'bts/rub',
                    'doge/btc',
                    'doge/ltc',
                    'doge/ppc',
                    'doge/nxt',
                    'doge/eur',
                    'doge/usd',
                    'doge/dkk',
                    'doge/rub',
                    'fimk/btc',
                    'fimk/nxt',
                    'fimk/bts',
                    'fimk/eur',
                    'fimk/usd',
                    'fimk/dkk',
                    'fimk/rub',
                    'dash/btc',
                    'dash/ltc',
                    'dash/bts',
                    'dash/doge',
                    'dash/eur',
                    'dash/usd',
                    'dash/dkk',
                    'dash/rub',
                    'nsr/btc',
                    'nsr/nbt',
                    'nsr/ppc',
                    'btc/cny',
                    'ltc/cny',
                    'ppc/cny',
                    'nsr/cny',
                    'nxt/cny',
                    'doge/cny',
                    'blk/cny',
                    'dash/cny',
                    'bts/cny',
                    'ccs/eur',
                    'ccs/btc',
                    'ccs/nxt',
                    'nsr/usd',
                    'nsr/eur',
                    'nbt/ltc',
                    'nbt/cny',
                    'bitusd/usd',
                    'bitcny/cny',
                    'bitusd/cny',
                    'bitusd/jpy',
                    'qora/btc',
                    'qora/usd',
                    'qora/eur',
                    'qora/cny',
                    'nbt/bks',
                    'btc/bks',
                    'qora/bts',
                    'qora/nxt',
                    'nbt/bkc',
                    'bks/nbt',
                    'bks/btc',
                    'xrp/btc',
                    'xrp/usd',
                    'xrp/eur',
                    'xrp/cny',
                    'xrp/jpy',
                    'xrp/dkk',
                    'xrp/nbt',
                    'xrp/bitusd'
                ]
            },
            poloniex: {
                feed_name: 'poloniex',
                feed_host: 'poloniex.com',
                feed_path: '/public?command=returnTicker',
                polling_interval_seconds: 60,
                instructions: '',
                whitelist: [
                    'blackmagic'
                    , 'BTC_BTS'
                ],
                blacklist: [
                    'blackmagic',
                    'BTC_BBR',
                    'BTC_BCN',
                    'BTC_RBY',
                    'BTC_SDC',
                    'BTC_VNL',
                    'BTC_URO',
                    'BTC_XRP',
                    'BTC_SILK',
                    'BTC_XDN',
                    'BTC_MRS',
                    'BTC_MIL',
                    'BTC_HUC',
                    'BTC_XMR',
                    'BTC_VIA',
                    'BTC_IOC',
                    'BTC_1CR',
                    'BTC_HUGE',
                    'BTC_MAID',
                    'BTC_CHA',
                    'XMR_XDN',
                    'BTC_HIRO',
                    'BTC_GMC',
                    'BTC_EXE',
                    'BTC_CURE',
                    'BTC_MSC',
                    'USDT_XRP',
                    'BTC_NSR',
                    'BTC_UNITY',
                    'BTC_DGB',
                    'BTC_SC',
                    'XMR_DASH',
                    'BTC_XUSD',
                    'BTC_GAP',
                    'BTC_NXT',
                    'BTC_LQD',
                    'XMR_BLK',
                    'BTC_CGA',
                    'BTC_ADN',
                    'BTC_NOTE',
                    'USDT_DASH',
                    'BTC_BLOCK',
                    'BTC_XPB',
                    'BTC_BURST',
                    'BTC_FIBRE',
                    'BTC_BLK',
                    'BTC_MMC',
                    'BTC_MMNXT',
                    'BTC_FLT',
                    'BTC_ETH',
                    'BTC_C2',
                    'BTC_MINT',
                    'BTC_BCY',
                    'BTC_GRC',
                    'BTC_LTBC',
                    'BTC_PIGGY',
                    'USDT_LTC',
                    'XMR_DIEM',
                    'BTC_ABY',
                    'XMR_BTCD',
                    'BTC_NXTI',
                    'XMR_DSH',
                    'BTC_XBC',
                    'BTC_GEMZ',
                    'BTC_QBK',
                    'BTC_BELA',
                    'BTC_NOXT',
                    'XMR_LTC',
                    'USDT_NXT',
                    'BTC_RDD',
                    'BTC_SWARM',
                    'BTC_XAI',
                    'BTC_EMC2',
                    'BTC_PTS',
                    'BTC_QORA',
                    'BTC_NEOS',
                    'BTC_SJCX',
                    'BTC_XCH',
                    'BTC_CNMT',
                    'BTC_BITS',
                    'BTC_FLO',
                    'BTC_XMG',
                    'BTC_UIS',
                    'BTC_XPM',
                    'XMR_NXT',
                    'BTC_XEM',
                    'USDT_STR',
                    'BTC_NAUT',
                    'BTC_XCN',
                    'BTC_XDP',
                    'BTC_XST',
                    'BTC_VRC',
                    'BTC_PPC',
                    'BTC_YACC',
                    'XMR_BBR',
                    'USDT_XMR',
                    'BTC_POT',
                    'XMR_BCN',
                    'BTC_BTCD',
                    'USDT_ETH',
                    'BTC_CYC',
                    'BTC_SYS',
                    'BTC_HYP',
                    'XMR_MNTA',
                    'BTC_NBT',
                    'BTC_XC',
                    'BTC_DASH',
                    'BTC_DOGE',
                    'BTC_XCP',
                    'XMR_HYP',
                    'BTC_GEO',
                    'BTC_PRC',
                    'XMR_IFC',
                    'BTC_QTL',
                    'BTC_NAV',
                    'BTC_CLAM',
                    'XMR_MAID',
                    'BTC_XCR',
                    'BTC_DIEM',
                    'BTC_NMC',
                    'BTC_INDEX',
                    'BTC_MYR',
                    'BTC_STR',
                    'BTC_VTC',
                    'BTC_SYNC',
                    'BTC_MCN',
                    'BTC_FLDC',
                    'BTC_GRS',
                    'BTC_OPAL',
                    'BTC_LTC',
                    'BTC_RIC',
                    'BTC_WDC',
                    'XMR_QORA',
                    'BTC_ARCH',
                    'BTC_HZ',
                    'USDT_BTC,',
                    'BTC_NOBL',
                    'BTC_EXP',
                    'BTC_JLH',
                    'BTC_FCT',
                    'BTC_BTM',
                    'BTC_PINK'
                ]
            }
        },*/
        twitter: {
            twitter_api_key: 'u8sF8NuWwAKGeu4hqfunCtcrn',
            twitter_api_secret: '4A94913SduGjq5a56ulpBVkXkaztIFV3CU94djq9XeL3hEYUPb',
            twitter_access_token: '3311646560-DE98GlT3OYPsTLGB6ie7dsBPMAZAXUQU3O76Wiy',
            twitter_access_token_secret: 'kRDtUZ6cFyXVkir3U8vfNgGTzYjEXL91PiYbmxcwTHXcJ',
            twitter_track: 'bitshares',
            twitter_feed_name: 'tweet',
            latest_tweet_screen_name: 'kenCode_de',
            poll_delay_seconds: 60
        }
    },
    team_roster_metadata: [
        {
            name: 'ken Code',
            jobtitle: 'Delegate and Crypto Coach',
            img_src: 'img/team-ken.jpg',
            description00: 'Our resident Business and Startups expert, ken brings over 20 years of industry expertise, working with large multi-national and small businesses alike',
            description01: 'A Software Developer, Efficiency Expert and R&D fanatic, he also invented the online shopping cart.',
            description02: 'New to German culture but a true German at heart, ken is always available for Technical and Business Support.'
        },
        {
            name: 'Christoph Hering',
            jobtitle: 'PR Manager and Crypto Coach',
            img_src: 'img/team-chris.jpg',
            description00: 'Born and raised right here in Munich, Chris is an active Trader and bi-lingual Sales Pro.',
            description01: 'He now has over 5 years of experience in Financial Analysis, working with Structured Products and handling of international commercial transactions.',
            description02: 'When he is not chatting with the Media, Chris is always out there networking and assisting local Business Owners.'
        },
        {
            name: 'Cristiano Zen',
            jobtitle: 'Wealth Management',
            img_src: 'img/team-cristiano.jpg',
            description00: 'Cristiano is a 20+ year Wealth Management, Private Banking and Financial Advisor.',
            description01: 'With homes in Switzerland, Munich and Brazil, he specializes in Absolute Return funds, loans, Structuring, offshore companies and multi-currency Trading.',
            description02: 'Cristiano also speaks Portuguese, German, Spanish and Italian so our international Clients are very happy.'
        },
        {
            name: 'Michael Ep',
            jobtitle: 'Bitcoin, Miner and Crypto Coach',
            img_src: 'img/team-michael.jpg',
            description00: 'Michael is our resident Bitcoin Expert. An avid Software Developer and IT guru, he can answer all of your Bitcoin related technical questions.',
            description01: 'Michael is also native to Munich, bi-lingual, and assists with many different crypto projects in the area and online.',
            description02: ''
        },
        {
            name: 'Ronny Boesing',
            jobtitle: 'Advisor, CCEDK',
            img_src: 'img/team-ronny.jpg',
            description00: 'When converting your fiat currency into crypto, CCEDK (Crypto Coins Exchange Denmark ApS) is the place to do it.',
            description01: 'CCEDK handles all of our banking, money transfer and fiat exchange services.',
            description02: 'Our international Clients love Ronny, as he fluently speaks Danish, German and French as well as some proficiency with Spanish, Norwegian, Swedish and even a little bit of Arabic and Japanese.'
        },
        {
            name: 'Daniel Larimer',
            jobtitle: 'Advisor, BitShares',
            img_src: 'img/team-dan.jpg',
            description00: 'Dan Larimer is an American based entrepreneur and Software Developer with a passion to find free market solutions to secure life, liberty and property. He has founded two startups and is the originator of the concept of DACs (Decentralized Autonomous Companies).',
            description01: 'Dan is the chief architect of the peer-to-peer, trustless, blockchain based financial platform known as BitShares.',
            description02: ''
        }
    ],
}