[![NPM][npm-shield]][npm-url]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

## Documentation

> This library implements a highly opinionated way of fetching and managing API data.

Queryframe lite is a typesafe API SDK generator for REST endpoints.

## Tech

Queryframe uses a number of open source projects under the hood:

- [Zod] - for schemas
- [Zocker] - 2kb library to generate mock data
- [Redaxios] - minimal fetch wrapper with axios interface

## Installation

Install the dependencies and follow the guide below.

```sh
pnpm add @inkheart/queryframe-lite
```

## Example Usage

```typescript
import { createQueryframeBuilder, z } from '@inkheart/queryframe-lite'

const builder = createQueryframeBuilder({
  baseURL: 'https://api.sampleapis.com',
})

const getAvatars = builder.createQuery({
  endpoint: '/avatar/info',
  output: z
    .object({
      synopsis: z.string(),
    })
    .array(),
})

const { queryframe } = builder.createQueryframe({
  getAvatars,
})

export default queryframe
```

#### Handle interface

```typescript
import queryframe from '...'

try {
  const result = await queryframe.getExpenseCategories.handle({})
} catch (error) {
  console.error(error)
}
```

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[npm-shield]: https://img.shields.io/npm/v/@inkheart/queryframe-lite?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/@inkheart/queryframe-lite
[contributors-shield]: https://img.shields.io/github/contributors/akparhi/queryframe.svg?style=for-the-badge
[contributors-url]: https://github.com/akparhi/queryframe-lite/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/akparhi/queryframe.svg?style=for-the-badge
[forks-url]: https://github.com/akparhi/queryframe-lite/network/members
[stars-shield]: https://img.shields.io/github/stars/akparhi/queryframe.svg?style=for-the-badge
[stars-url]: https://github.com/akparhi/queryframe-lite/stargazers
[issues-shield]: https://img.shields.io/github/issues/akparhi/queryframe.svg?style=for-the-badge
[issues-url]: https://github.com/akparhi/queryframe-lite/issues
[license-shield]: https://img.shields.io/github/license/akparhi/queryframe.svg?style=for-the-badge
[license-url]: https://github.com/akparhi/queryframe-lite/blob/main/LICENSE
[Zod]: https://zod.dev/
[Redaxios]: https://github.com/developit/redaxios
[Zocker]: https://github.com/LorisSigrist/zocker/
