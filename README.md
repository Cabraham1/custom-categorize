# custom-categorize

[![npm version](https://img.shields.io/npm/v/custom-categorize.svg)](https://www.npmjs.com/package/custom-categorize)
[![License: ISC](https://img.shields.io/npm/l/custom-categorize.svg)](LICENSE)

## Overview

**custom-categorize** is a lightweight library designed to help you categorize data based on custom filtering logic.  
Built with flexibility in mind, the library offers:
- **Default filtering:** Use built-in logic for common grouping scenarios.
- **Custom filtering:** Pass your own filter function to tailor the categorization process to your data.
- **TypeScript support:** Written in TypeScript for type safety and better developer experience.

This library is ideal for projects where you need to process and group data dynamically, such as dashboards, reporting tools, or any application that handles large datasets.

## Installation

You can install **custom-categorize** via npm or Yarn:

```bash
npm install custom-categorize
yarn add custom-categorize
```

## Usage

Below is a basic example demonstrating how to use the library. This example categorizes an array of user data by language.

### Example

```bash
import { categorize } from 'custom-categorize'; // For ES Modules

// or if you are not using ES Modules

// const { categorize } = require('custom-categorize'); // For CommonJS

const users = [
  {
    data: [
      {
        userStatus: { status: "active" },
        country: "USA",
        language: "en",
        businessUnit: { name: "Sales" },
      },
      {
        userStatus: { status: "run" },
        country: "USA",
        language: "en",
        businessUnit: { name: "Marketing" },
      },
      {
        userStatus: { status: "active" },
        country: "Nigeria",
        language: "pt",
        businessUnit: { name: "Sales" },
      },
      {
        userStatus: { status: "inactive" },
        country: "Canada",
        language: "fr",
        businessUnit: { name: "Support" },
      },
      {
        userStatus: { status: "active" },
        country: "Germany",
        language: "de",
        businessUnit: { name: "Engineering" },
      },
      {
        userStatus: { status: "inactive" },
        country: "India",
        language: "hi",
        businessUnit: { name: "HR" },
      },
      {
        userStatus: { status: "active" },
        country: "Brazil",
        language: "pt",
        businessUnit: { name: "Sales" },
      },
      {
        userStatus: { status: "inactive" },
        country: "Japan",
        language: "ja",
        businessUnit: { name: "Marketing" },
      },
      {
        userStatus: { status: "run" },
        country: "Australia",
        language: "en",
        businessUnit: { name: "Support" },
      },
      {
        userStatus: { status: "active" },
        country: "UK",
        language: "en",
        businessUnit: { name: "Engineering" },
      },
    ],
    total: 10,
    count: 10,
    page: 1,
    pageCount: 1,
  },
];

const selectedFilters = ["en"];
const targetName = "language";

const result = categorize(users, selectedFilters, targetName);
console.log(JSON.stringify(result, null, 2));
```

When you run the above code, the output will group the data based on the language property. You might see output similar to:

```json
{
  "en": {
    "data": [ ... ],
    "total": 10,
    "count": 10,
    "page": 1,
    "pageCount": 1
  }
}
```

### Custom Filtering

If you need more advanced filtering logic, you can pass your own custom filter function as the fourth parameter:

```bash
const customFilter = (card, category, targetName) => {
  // Example: Case-insensitive match for language
  if (targetName === "language") {
    return card.language.toLowerCase() === category.toLowerCase();
  }
  return false;
};

const result = categorize(users, selectedFilters, "language", customFilter);
console.log(result);
```

## API Reference

```bash
categorize(users, selectedFilters, targetName, [filterFn])
```

**Parameters:**

- `users` (Array): An array of user objects. Each object should include a data array and may include pagination info such as total, count, page, and pageCount.
- `selectedFilters` (Array<string>): An array of category filters (e.g., ["en"], ["active"]).
- `targetName` (string): The property to group by (for example, "status", "language", "country", or "businessunit").
- `filterFn` ((card, category, targetName) => boolean, optional): A custom filter function. If omitted, the default filter logic is used.

**Returns:**

An object where each key is a filter from selectedFilters and its value is an object containing:

- `data`: The array of filtered user objects.
- `total`, `count`, `page`, `pageCount`: Aggregated pagination data.

## Contributing

Contributions are highly appreciated! If you’d like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Write tests to cover your changes.
4. Submit a pull request with a detailed description of your changes.