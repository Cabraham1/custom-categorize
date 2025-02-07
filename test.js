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
const groupName = "language";

const result = categorize(users, selectedFilters, groupName);
console.log(JSON.stringify(result, null, 2));
