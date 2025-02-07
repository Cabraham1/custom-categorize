// test.js
const { categorize } = require("./dist/index");

// Sample test data:
const users = [
  {
    data: [
      {
        userStatus: { status: "active" },
        country: "USA",
        language: "en",
        businessUnit: { name: "Sales" },
        work: "new york",
      },
      {
        userStatus: { status: "run" },
        country: "USA",
        language: "en",
        businessUnit: { name: "Marketing" },
        work: "san francisco",
      },
      {
        userStatus: { status: "active" },
        country: "Nigeria",
        language: "pt",
        businessUnit: { name: "Sales" },
        work: "lagos",
      },
      {
        userStatus: { status: "inactive" },
        country: "Canada",
        language: "fr",
        businessUnit: { name: "Support" },
        work: "toronto",
      },
      {
        userStatus: { status: "active" },
        country: "Germany",
        language: "de",
        businessUnit: { name: "Engineering" },
        work: "berlin",
      },
      {
        userStatus: { status: "inactive" },
        country: "India",
        language: "hi",
        businessUnit: { name: "HR" },
        work: "mbl",
      },
      {
        userStatus: { status: "active" },
        country: "Brazil",
        language: "pt",
        businessUnit: { name: "Sales" },
        work: "sao paulo",
      },
      {
        userStatus: { status: "inactive" },
        country: "Japan",
        language: "ja",
        businessUnit: { name: "Marketing" },
        work: "tokyo",
      },
      {
        userStatus: { status: "run" },
        country: "Australia",
        language: "en",
        businessUnit: { name: "Support" },
        work: "sydney",
      },
      {
        userStatus: { status: "active" },
        country: "UK",
        language: "en",
        businessUnit: { name: "Engineering" },
        work: "london",
      },
    ],
    total: 10,
    count: 10,
    page: 1,
    pageCount: 1,
  },
];
const selectedFilters = ["london", "tokyo", "mbl", "toronto"];
const groupName = "work";

const result = categorize(users, selectedFilters, groupName);
console.log(JSON.stringify(result, null, 2));
