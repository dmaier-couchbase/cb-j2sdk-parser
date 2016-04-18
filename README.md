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

can be used in order to convert the entries into a CSV format which can then be imported to e.g. Excel. Please see the example output file in the 'latency_timings' folder!
