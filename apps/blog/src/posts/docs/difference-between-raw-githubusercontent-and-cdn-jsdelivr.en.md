---
title: 'Differences between `raw.githubusercontent.com` and `cdn.jsdelivr.net`'
description: '`raw.githubusercontent.com` serves GitHub files exactly as original files, while `cdn.jsdelivr.net` is a CDN service that provides optimized content quickly and reliably, so their purposes and features differ.'
created: '2024-08-02'
updated: '2024-08-02'
categories:
  - 'git'
references:
  - 'https://www.jsdelivr.com/'
  - 'https://dreamcoding.tistory.com/43'
  - 'https://computer-science-student.tistory.com/297'
  - 'https://kyulee.tistory.com/entry/CDN-Github-jsdelivr'
  - 'https://tesseractjh.tistory.com/209'
  - 'https://korband.tistory.com/6'
---

The differences between `raw.githubusercontent.com`, provided by GitHub, and `cdn.jsdelivr.net`, a representative GitHub CDN(Content Delivery Network) service, come from their purposes, behavior, and the way they provide services.

## 1. `raw.githubusercontent.com`

### 1-1. Purpose and Use Cases

- `raw.githubusercontent.com` is a URL that provides GitHub files exactly as their original files. It is mainly used when accessing the original content of files stored in a GitHub repository.
- Like AWS S3, it allows GitHub to be used as a data storage service.
- For example, it is used when you want to directly read the content of a `README.md` file or image file in a specific repository.

### 1-2. How It Works

- When accessed through the URL, it provides the raw data of the file in the GitHub repository as-is.
- It is mainly useful when developers access scripts, configuration files, data files, and so on.

### 1-3. Provided Services

- It simply provides the raw data of files.
- It does not provide advanced features such as caching, load balancing, or content optimization.

### 1-4. URI Structure

```txt
https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{file_path}
```

> [!IMPORTANT]
>
> The method using `raw.githubusercontent.com` is only possible when the Repository is Public.

## 2. `cdn.jsdelivr.net`(CDN)

### 2-1. Purpose and Use Cases

- A CDN is a system for providing content quickly and reliably to users around the world without geographical restrictions through a globally distributed server network.
- It is mainly used for websites, video streaming, software distribution, large file delivery, and so on.
- It is also used when a stable service environment must be provided to users in distant regions. For example, online game companies such as NC and Kakao Games use CDN to provide services as far as North America and Europe.

### 2-2. How It Works

- It reduces latency and improves load speed by serving content requested by the user from a geographically nearby server.
- It minimizes the time required for content loading by reducing the physical distance between the server and the user.
- By caching content, it can reduce load on the origin server and respond quickly when the same request is repeated.
- For example, it improves website performance by efficiently serving images, CSS files, JavaScript files, and so on for web pages.

### 2-3. Provided Services

- Content caching: Caches frequently requested data and provides it quickly.
- Load balancing: Distributes traffic across multiple servers to prevent server overload.
- Security features: DDoS protection, SSL certificate management, and so on.
- Performance optimization: Improves load speed through compression, image optimization, network optimization, and so on.

### 2-4. URI Structure

```txt
https://cdn.jsdelivr.net/gh/{owner}/{repo}@{branch}/{file_path}
```

> [!IMPORTANT]
>
> `cdn.jsdelivr.net` refreshes cache data every 12 hours, so even if a file changes, it is not reflected in real time.

## 3. Summary of Key Differences

1. Original data delivery vs optimized content delivery

    - `raw.githubusercontent.com` provides files in a GitHub repository exactly as original files.
    - `cdn.jsdelivr.net`(CDN) optimizes and caches content to provide it quickly and reliably.

1. Simple access vs advanced features

    - `raw.githubusercontent.com` is a simple file access method.
    - `cdn.jsdelivr.net`(CDN) provides advanced features such as caching, load balancing, security, and performance optimization.

1. Main purpose

    - `raw.githubusercontent.com` is mainly used when developers access the original content of a specific file.
    - `cdn.jsdelivr.net`(CDN) is used in various cases that require high-speed transfer, such as web content, media files, and software distribution.
