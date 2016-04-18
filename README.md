# Couchbase Java 2.x SDK client log parsers
A bunch of simple parsers for the Couchbase 2.x client SDK log files

## Latency timings

The Couchbase Java SDK allows you fetch some client side latency timings by using the CouchbaseEnvrionment, e.g.:

```
CouchbaseEnvironment env = DefaultCouchbaseEnvironment
    .builder()
    .networkLatencyMetricsCollectorConfig(DefaultLatencyMetricsCollectorConfig.create(10, TimeUnit.MINUTES))
    .build();
```


The logging (e.g. Log4j) needs to be configured in a way that an entry has the following format:

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

can be used in order to convert the entries into a CSV format which can then be imported to e.g. Excel. The output then looks similar to the following one:

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
```
