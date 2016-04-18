# Couchbase Java 2.x SDK client log parsers
A bunch of simple parsers for the Couchbase 2.x client SDK log files

## Latency timings

Logging is configured in a way that an entry has the following format.


* Time stamp YYYY-MM-DD hh:mm:ss.uuu
* Thread-id
* LEVEL
* Package

Here an example:

```
 2016-04-18 18:11:00.730 [cb-computations-3] INFO  com.couchbase.client.core.event.consumers.LoggingConsumer=>info - {"/172.28.6.3:11210":{"BINARY":{"CounterRequest":{"SUCCESS":{"metrics":{"percentiles    ":{"50.0":108,"90.0":182,"95.0":5668,"99.0":41156,"99.9":185597},"min":59,"max":299892,"count":2848335,"timeUnit":"MICROSECONDS"}}},"GetRequest":{"NOT_EXISTS":{"metrics":{"percentiles":{"50.0":91,"90.    0":133,"95.0":163,"99.0":696,"99.9":170917},"min":56,"max":267386,"count":17868,"timeUnit":"MICROSECONDS"}},"SUCCESS":{"metrics":{"percentiles":{"50.0":98,"90.0":167,"95.0":4587,"99.0":40894,"99.9":182452},"min":52,"max":299892,"count":6959258,"timeUnit":"MICROSECONDS"}}},"InsertRequest":{"SUCCESS":{"metrics":{"percentiles":{"50.0":148,"90.0":182,"95.0":204,"99.0":864,"99.9":149946},"min":102,"max    ":226492,"count":8828,"timeUnit":"MICROSECONDS"}}},"GetBucketConfigRequest":{"SUCCESS":{"metrics":{"percentiles":{"50.0":284,"90.0":507,"95.0":516,"99.0":962,"99.9":962},"min":99,"max":962,"count":35,    "timeUnit":"MICROSECONDS"}}}}},"/172.28.3.3:11210":{"BINARY":{"CounterRequest":{"SUCCESS":{"metrics":{"percentiles":{"50.0":110,"90.0":189,"95.0":5668,"99.0":41156,"99.9":186646},"min":58,"max":299892    ,"count":2872488,"timeUnit":"MICROSECONDS"}}},"GetRequest":{"NOT_EXISTS":{"metrics":{"percentiles":{"50.0":92,"90.0":136,"95.0":164,"99.0":737,"99.9":170917},"min":52,"max":262143,"count":17928,"timeU    nit":"MICROSECONDS"}},"SUCCESS":{"metrics":{"percentiles":{"50.0":99,"90.0":169,"95.0":4620,"99.0":40894,"99.9":183500},"min":50,"max":310378,"count":7009951,"timeUnit":"MICROSECONDS"}}},"InsertReques    t":{"SUCCESS":{"metrics":{"percentiles":{"50.0":152,"90.0":186,"95.0":208,"99.0":745,"99.9":154140},"min":98,"max":231735,"count":8934,"timeUnit":"MICROSECONDS"}}},"GetBucketConfigRequest":{"SUCCESS":    {"metrics":{"percentiles":{"50.0":195,"90.0":407,"95.0":466,"99.0":565,"99.9":2113},"min":99,"max":2113,"count":53,"timeUnit":"MICROSECONDS"}}}}},"/172.28.8.3:11210":{"BINARY":{"CounterRequest":{"SUCC    ESS":{"metrics":{"percentiles":{"50.0":114,"90.0":192,"95.0":5668,"99.0":41156,"99.9":186646},"min":56,"max":299892,"count":2859665,"timeUnit":"MICROSECONDS"}}},"GetRequest":{"NOT_EXISTS":{"metrics":{    "percentiles":{"50.0":92,"90.0":138,"95.0":164,"99.0":413,"99.9":167772},"min":55,"max":262143,"count":17570,"timeUnit":"MICROSECONDS"}},"SUCCESS":{"metrics":{"percentiles":{"50.0":100,"90.0":169,"95.    0":4554,"99.0":40894,"99.9":183500},"min":49,"max":310378,"count":6993452,"timeUnit":"MICROSECONDS"}}},"InsertRequest":{"SUCCESS":{"metrics":{"percentiles":{"50.0":151,"90.0":189,"95.0":206,"99.0":442,"99.9":160432},"min":103,"max":229638,"count":8831,"timeUnit":"MICROSECONDS"}}},"GetBucketConfigRequest":{"SUCCESS":{"metrics":{"percentiles":{"50.0":181,"90.0":382,"95.0":456,"99.0":872,"99.9":872},    "min":86,"max":872,"count":44,"timeUnit":"MICROSECONDS"}}}}},"event":{"name":"NetworkLatencyMetrics","type":"METRIC"}}
```

The the script

```
node latency_timings.js some.log > latency_timings.csv
```

can be used in order to convert the entries into a CSV format which can then be imported to e.g. Excel. The output might look similar to the following one:

```
2016-04-18 21:48:57.342;/172.28.6.3:11210;ReplaceRequest;perc_50.0;130;perc_90.0;186;perc_95.0;1777;perc_99.0;35127;perc_99.9;205520;min;82;max;3170893;count;122600;
2016-04-18 21:48:57.342;/172.28.6.3:11210;CounterRequest;perc_50.0;109;perc_90.0;181;perc_95.0;3522;perc_99.0;36438;perc_99.9;193986;min;59;max;1342177;count;2694740;
2016-04-18 21:48:57.342;/172.28.6.3:11210;GetRequest;perc_50.0;97;perc_90.0;163;perc_95.0;2752;perc_99.0;36175;perc_99.9;192937;min;51;max;3170893;count;6560696;
2016-04-18 21:48:57.342;/172.28.6.3:11210;InsertRequest;perc_50.0;146;perc_90.0;181;perc_95.0;210;perc_99.0;638;perc_99.9;3211;min;107;max;13107;count;2419;
2016-04-18 21:48:57.342;/172.28.6.3:11210;UpsertRequest;perc_50.0;5013;perc_90.0;8650;perc_95.0;9306;perc_99.0;10616;perc_99.9;11665;min;970;max;11665;count;341;
2016-04-18 21:48:57.342;/172.28.6.3:11210;GetBucketConfigRequest;perc_50.0;180;perc_90.0;401;perc_95.0;409;perc_99.0;761;perc_99.9;761;min;114;max;761;count;36;
2016-04-18 21:48:57.342;/172.28.3.3:11210;ReplaceRequest;perc_50.0;132;perc_90.0;196;perc_95.0;1687;perc_99.0;35127;perc_99.9;207618;min;81;max;320864;count;122897;
2016-04-18 21:48:57.342;/172.28.3.3:11210;CounterRequest;perc_50.0;112;perc_90.0;192;perc_95.0;3522;perc_99.0;36438;perc_99.9;193986;min;54;max;6274678;count;2710386;
2016-04-18 21:48:57.342;/172.28.3.3:11210;GetRequest;perc_50.0;98;perc_90.0;172;perc_95.0;2785;perc_99.0;36175;perc_99.9;196083;min;51;max;6274678;count;6587427;
2016-04-18 21:48:57.342;/172.28.3.3:11210;InsertRequest;perc_50.0;149;perc_90.0;184;perc_95.0;218;perc_99.0;909;perc_99.9;11730;min;98;max;55050;count;2470;
2016-04-18 21:48:57.342;/172.28.3.3:11210;UpsertRequest;perc_50.0;9240;perc_90.0;14352;perc_95.0;14942;perc_99.0;15925;perc_99.9;28704;min;1499;max;28704;count;342;
2016-04-18 21:48:57.342;/172.28.3.3:11210;GetBucketConfigRequest;perc_50.0;235;perc_90.0;409;perc_95.0;573;perc_99.0;2949;perc_99.9;2949;min;109;max;2949;count;45;
2016-04-18 21:48:57.342;/172.28.8.3:11210;ReplaceRequest;perc_50.0;132;perc_90.0;182;perc_95.0;1679;perc_99.0;35127;perc_99.9;204472;min;85;max;320864;count;123938;
2016-04-18 21:48:57.342;/172.28.8.3:11210;CounterRequest;perc_50.0;112;perc_90.0;186;perc_95.0;3555;perc_99.0;36438;perc_99.9;193986;min;61;max;329252;count;2697951;
2016-04-18 21:48:57.342;/172.28.8.3:11210;GetRequest;perc_50.0;99;perc_90.0;167;perc_95.0;2818;perc_99.0;36175;perc_99.9;190840;min;53;max;329252;count;6555185;
2016-04-18 21:48:57.342;/172.28.8.3:11210;InsertRequest;perc_50.0;136;perc_90.0;171;perc_95.0;192;perc_99.0;716;perc_99.9;158334;min;89;max;278921;count;7284;
2016-04-18 21:48:57.342;/172.28.8.3:11210;UpsertRequest;perc_50.0;5079;perc_90.0;6848;perc_95.0;7110;perc_99.0;7569;perc_99.9;12451;min;557;max;12451;count;341;
2016-04-18 21:48:57.342;/172.28.8.3:11210;GetBucketConfigRequest;perc_50.0;236;perc_90.0;362;perc_95.0;374;perc_99.0;2031;perc_99.9;2031;min;110;max;2031;count;45;
2016-04-18 21:58:57.317;/172.28.6.3:11210;ReplaceRequest;perc_50.0;137;perc_90.0;172;perc_95.0;222;perc_99.0;26083;perc_99.9;170917;min;84;max;245366;count;28155;
2016-04-18 21:58:57.317;/172.28.6.3:11210;CounterRequest;perc_50.0;110;perc_90.0;181;perc_95.0;4112;perc_99.0;37748;perc_99.9;187695;min;55;max;6073352;count;2669114;
2016-04-18 21:58:57.317;/172.28.6.3:11210;GetRequest;perc_50.0;97;perc_90.0;163;perc_95.0;3424;perc_99.0;37486;perc_99.9;195035;min;51;max;6073352;count;6597206;
2016-04-18 21:58:57.317;/172.28.6.3:11210;InsertRequest;perc_50.0;151;perc_90.0;183;perc_95.0;204;perc_99.0;573;perc_99.9;4915;min;110;max;5505;count;789;
2016-04-18 21:58:57.317;/172.28.6.3:11210;GetBucketConfigRequest;perc_50.0;239;perc_90.0;491;perc_95.0;573;perc_99.0;835;perc_99.9;835;min;103;max;835;count;36;
2016-04-18 21:58:57.317;/172.28.3.3:11210;ReplaceRequest;perc_50.0;138;perc_90.0;178;perc_95.0;222;perc_99.0;26476;perc_99.9;176160;min;93;max;243269;count;28420;
2016-04-18 21:58:57.317;/172.28.3.3:11210;CounterRequest;perc_50.0;112;perc_90.0;195;perc_95.0;3997;perc_99.0;37486;perc_99.9;187695;min;59;max;6174015;count;2684348;
2016-04-18 21:58:57.317;/172.28.3.3:11210;GetRequest;perc_50.0;98;perc_90.0;171;perc_95.0;3244;perc_99.0;37486;perc_99.9;195035;min;48;max;6174015;count;6625509;
2016-04-18 21:58:57.317;/172.28.3.3:11210;InsertRequest;perc_50.0;150;perc_90.0;184;perc_95.0;208;perc_99.0;528;perc_99.9;1679;min;106;max;7340;count;855;
2016-04-18 21:58:57.317;/172.28.3.3:11210;GetBucketConfigRequest;perc_50.0;195;perc_90.0;413;perc_95.0;487;perc_99.0;815;perc_99.9;815;min;102;max;815;count;44;
2016-04-18 21:58:57.317;/172.28.8.3:11210;ReplaceRequest;perc_50.0;139;perc_90.0;174;perc_95.0;226;perc_99.0;26738;perc_99.9;171966;min;91;max;245366;count;28827;
2016-04-18 21:58:57.317;/172.28.8.3:11210;CounterRequest;perc_50.0;113;perc_90.0;187;perc_95.0;4046;perc_99.0;37748;perc_99.9;189792;min;62;max;274726;count;2669740;
2016-04-18 21:58:57.317;/172.28.8.3:11210;GetRequest;perc_50.0;99;perc_90.0;168;perc_95.0;3358;perc_99.0;37486;perc_99.9;185597;min;52;max;283115;count;6594155;
2016-04-18 21:58:57.317;/172.28.8.3:11210;InsertRequest;perc_50.0;144;perc_90.0;177;perc_95.0;196;perc_99.0;577;perc_99.9;2539;min;102;max;10878;count;1968;
2016-04-18 21:58:57.317;/172.28.8.3:11210;GetBucketConfigRequest;perc_50.0;262;perc_90.0;454;perc_95.0;518;perc_99.0;606;perc_99.9;618;min;109;max;618;count;52;
2016-04-18 22:08:57.306;/172.28.6.3:11210;ReplaceRequest;perc_50.0;142;perc_90.0;176;perc_95.0;209;perc_99.0;843;perc_99.9;182452;min;97;max;278921;count;14861;
2016-04-18 22:08:57.306;/172.28.6.3:11210;CounterRequest;perc_50.0;110;perc_90.0;183;perc_95.0;5537;perc_99.0;39059;perc_99.9;202375;min;60;max;5570035;count;2642959;
2016-04-18 22:08:57.306;/172.28.6.3:11210;GetRequest;perc_50.0;97;perc_90.0;164;perc_95.0;4685;perc_99.0;39059;perc_99.9;205520;min;52;max;5570035;count;6547619;
2016-04-18 22:08:57.306;/172.28.6.3:11210;InsertRequest;perc_50.0;152;perc_90.0;194;perc_95.0;261;perc_99.0;1138;perc_99.9;7995;min;112;max;9109;count;504;
2016-04-18 22:08:57.306;/172.28.6.3:11210;GetBucketConfigRequest;perc_50.0;284;perc_90.0;436;perc_95.0;4816;perc_99.0;3808428;perc_99.9;3808428;min;102;max;3808428;count;43;
2016-04-18 22:08:57.306;/172.28.3.3:11210;ReplaceRequest;perc_50.0;141;perc_90.0;177;perc_95.0;204;perc_99.0;671;perc_99.9;189792;min;93;max;411041;count;14635;
2016-04-18 22:08:57.306;/172.28.3.3:11210;CounterRequest;perc_50.0;111;perc_90.0;190;perc_95.0;5341;perc_99.0;39059;perc_99.9;200278;min;56;max;6274678;count;2662981;
2016-04-18 22:08:57.306;/172.28.3.3:11210;GetRequest;perc_50.0;97;perc_90.0;166;perc_95.0;4685;perc_99.0;39321;perc_99.9;214958;min;46;max;6274678;count;6584740;
2016-04-18 22:08:57.306;/172.28.3.3:11210;InsertRequest;perc_50.0;152;perc_90.0;194;perc_95.0;220;perc_99.0;495;perc_99.9;8454;min;108;max;1035993;count;605;
2016-04-18 22:08:57.306;/172.28.3.3:11210;GetBucketConfigRequest;perc_50.0;195;perc_90.0;389;perc_95.0;671;perc_99.0;806;perc_99.9;806;min;95;max;806;count;40;
2016-04-18 22:08:57.306;/172.28.8.3:11210;ReplaceRequest;perc_50.0;144;perc_90.0;177;perc_95.0;206;perc_99.0;684;perc_99.9;189792;min;97;max;283115;count;15282;
2016-04-18 22:08:57.306;/172.28.8.3:11210;CounterRequest;perc_50.0;112;perc_90.0;188;perc_95.0;5406;perc_99.0;39059;perc_99.9;202375;min;59;max;325058;count;2645575;
2016-04-18 22:08:57.306;/172.28.8.3:11210;GetRequest;perc_50.0;99;perc_90.0;167;perc_95.0;4489;perc_99.0;38797;perc_99.9;199229;min;51;max;316669;count;6551585;
2016-04-18 22:08:57.306;/172.28.8.3:11210;InsertRequest;perc_50.0;148;perc_90.0;177;perc_95.0;197;perc_99.0;430;perc_99.9;9961;min;106;max;62128;count;1273;
2016-04-18 22:08:57.306;/172.28.8.3:11210;GetBucketConfigRequest;perc_50.0;234;perc_90.0;389;perc_95.0;614;perc_99.0;1146;perc_99.9;1146;min;105;max;1146;count;49;
```
