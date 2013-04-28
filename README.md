meta-encryption
===============
##### *Safer encryption by averaging the weaknesses of singular ciphers*

---

**author**: Lorenz Lo Sauer 2011, 2013; www.lsauer.com

**website**: https://github.com/lsauer/meta-encryption

**license**: MIT license, Graphics: CC-BY-SA 3

**description**: quickly plot entropy information and string metrics of arbitrary files or strings from the console Input/Output

### About
User passwords are generally not safe and are chosen pragrammatically and oportunistically, rather than randomly.[1] Likewise service providers frequently make pragmatic and opportunistic choices, thus potentially contributing to the widespread use of weak hash-functions.[2]   

A barrier to brute force attacks on hash-functions is imposed, when the hashing-function is initially unknown. This may be realized by using a random cipher from a static list of well-behaved hash-functions. The use of arbitarily choosing encryption-functions, throughout the encryption process, thwarts the attempt of determining the hashing-function through entropic cues (See [3]), revealed by readily available cryptanalysis software. 



#### References:

* [1] The battle against phishing: Dynamic Security Skins, R. Dhamija,J. D. Tygar, 2005 SOUPS '05 Proceedings, pg 77-88 

* [2] Attacks on hash functions and applications, Stevens, M.M.J., 2012, Doctoral Thesis, Leiden University

* [3] Entropic Security and the encryption of high-entropy messages, Y. Dodis and A. Smith., Theory of Cryptography Conference (TCC) 2005.