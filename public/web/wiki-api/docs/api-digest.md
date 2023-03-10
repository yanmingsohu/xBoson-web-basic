# 摘要算法

```javascript
var digest = require("digest");
```

# 方法

```javascript
var digest = require("digest");
var tar = digest.sha256(); // 'sha256' 可替换为对应方法
tar.update(lastBlockKey.toString());
tar.update(randstr);
var hash = tar.digest().bin();
```

## digest.sha1()

返回 sha-1 算法的 hash 对象.

## digest.sha224()

返回 sha-224 算法的 hash 对象.

## digest.sha256()

返回 sha-256 算法的 hash 对象.

## digest.sha384()

返回 sha-384 算法的 hash 对象.

## digest.sha512()

返回 sha-512 算法的 hash 对象.

## digest.md5()

返回 md5 算法的 hash 对象.

## digest.md2()

返回 md2 算法的 hash 对象.

## digest.sm3()

国密 sm3 摘要


# Class Hash

计算摘要的对象


## update(string: str)

使用字符串更新摘要


## update(integer: i)

使用整数更新摘要


## update(Bytes: b)

使用字节数组更新摘要


## Bytes digest()

返回摘要的字节数组


## number updatedBytes()

返回被计算过摘要的数据的字节数


## JsInputStream bind(InputStream)

该方法透明的绑定一个输入流, 在不影响读取数据的同时计算流中数据的摘要.
返回的对象和输入对象的行为完全相同. 这将允许多个 hash 流互相嵌套.


## JsOutputStream bind(OutputStream)

该方法透明的绑定一个输出流, 在不影响写出数据的同时计算流中数据的摘要.
返回的对象和输入对象的行为完全相同. 这将允许多个 hash 流互相嵌套.


## JsOutputStream getOutput()

返回一个输出流只用于计算数据的摘要.