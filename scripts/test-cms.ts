import { productCategorySchema, blogPostSchema, serviceFormSchema, slugSchema, RESERVED_SLUGS } from "../src/lib/schemas/admin";
import { renderSanitizedMarkdown } from "../src/lib/sanitizer";

async function runTests() {
  console.log("Running CMS Validation & Security Tests...\n");

  // 1. Reserved Slugs Test
  console.log("Test 1: Reserved Slugs");
  for (const slug of ["admin", "api", "new", "category"]) {
    const res = slugSchema.safeParse(slug);
    if (res.success) throw new Error(`Failed: Reserved slug "${slug}" was allowed!`);
  }
  console.log("✅ Reserved slugs rejected properly.");

  // 2. Product Category Code Pattern
  console.log("\nTest 2: Product Category Code Pattern");
  const validCat = productCategorySchema.safeParse({
    code: "LP-01",
    slug: "conventional-lightning-protection",
    group: "LP",
    groupLabel: "Lightning Protection",
    sortOrder: 1,
    title: "Conventional Systems",
    description: "Description long enough for validation rules (min 20 characters)...",
    productFamilies: ["Franklin Rods"],
    status: "PUBLISHED",
  });
  if (!validCat.success) throw new Error(`Failed: LP-01 validation error: ${JSON.stringify(validCat.error)}`);
  console.log("✅ Category code LP-01 validated successfully.");

  // 3. Sanitizer Test
  console.log("\nTest 3: Markdown HTML Sanitizer");
  const dangerous = `# Title\n<script>alert("xss")</script>\n[Bad Link](javascript:alert(1))\n[Good Link](https://visionenergy.ae)`;
  const cleanHtml = await renderSanitizedMarkdown(dangerous);
  if (cleanHtml.includes("<script>") || cleanHtml.includes("javascript:")) {
    throw new Error(`Failed: Sanitizer did not strip dangerous tags/links! Output: ${cleanHtml}`);
  }
  console.log("✅ Dangerous script tags and javascript: URLs stripped cleanly.");

  console.log("\n🎉 ALL CMS TESTS PASSED SUCCESSFULLY!");
}

runTests().catch((err) => {
  console.error("\n❌ TEST FAILURE:", err);
  process.exit(1);
});
