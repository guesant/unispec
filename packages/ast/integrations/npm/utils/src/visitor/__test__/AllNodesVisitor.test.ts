// import { BuildNodeNull, BuildNodeProvider, BuildNodeTypeArray, BuildNodeTypeBoolean, BuildNodeTypeInteger, BuildNodeTypeObject, BuildNodeTypeString } from "@unispec/ast-builder";
// import { describe, expect, it } from "vitest";
// import { AllNodesVisitor } from "./AllNodesVisitor";

// describe("AllNodesVisitor.VisitAllNodes", () => {
//   it("should return iterable for object type node with properties", () => {
//     const node = BuildNodeTypeObject({
//       properties: {
//         prop1: BuildNodeTypeString(),
//         prop2: BuildNodeTypeInteger(),
//         prop3: BuildNodeTypeBoolean(),
//         prop4: BuildNodeTypeArray({ items: BuildNodeTypeInteger() }),
//         prop5: BuildNodeTypeObject(),
//       },
//     });

//     const allNodes = Array.from(AllNodesVisitor.VisitAll(node));

//     expect(allNodes.length).toBe(7);

//     expect(allNodes[0]).toBe(node);

//     expect(allNodes.includes(node.properties.prop1)).toBeDefined();
//     expect(allNodes[1]).toBe(node.properties.prop1);

//     expect(allNodes.includes(node.properties.prop2)).toBeDefined();
//     expect(allNodes[2]).toBe(node.properties.prop2);

//     expect(allNodes.includes(node.properties.prop3)).toBeDefined();
//     expect(allNodes[3]).toBe(node.properties.prop3);

//     expect(allNodes.includes(node.properties.prop4)).toBeDefined();
//     expect(allNodes[4]).toBe(node.properties.prop4);

//     expect(allNodes.includes(node.properties.prop5)).toBeDefined();
//     expect(allNodes[5]).toBe(node.properties.prop5);

//     expect(allNodes.includes(node.properties.prop4.items)).toBeDefined();
//     expect(allNodes[6]).toBe(node.properties.prop4.items);
//   });

//   it("should not return iterable for object type node without properties", () => {
//     const node = BuildNodeNull();

//     const allNodes = Array.from(AllNodesVisitor.VisitAll(node));

//     expect(allNodes.length).toBe(1);
//     expect(allNodes[0]).toBe(node);
//   });

//   it("should work with provider", () => {
//     const node1 = BuildNodeNull();

//     const provider1 = BuildNodeProvider((ctx) => {
//       ctx.Add(node1);
//     });

//     const allNodes = Array.from(AllNodesVisitor.VisitAll(provider1));

//     expect(allNodes.length).toBe(2);
//     expect(allNodes[0]).toBe(provider1);
//     expect(allNodes[1]).toBe(node1);
//   });

//   it("should work with nested providers", () => {
//     const node1 = BuildNodeNull();

//     const provider1 = BuildNodeProvider((ctx) => {
//       ctx.Add(node1);
//     });

//     const provider2 = BuildNodeProvider((ctx) => {
//       ctx.Add(node1);
//       ctx.Add(provider1);
//     });

//     const allNodes = Array.from(AllNodesVisitor.VisitAll(provider2));

//     expect(allNodes.length).toBe(3);
//     expect(allNodes[0]).toBe(provider2);
//     expect(allNodes[1]).toBe(node1);
//     expect(allNodes[2]).toBe(provider1);
//   });

//   it("should work with recursive nested providers", () => {
//     const node1 = BuildNodeNull();

//     const provider1 = BuildNodeProvider((ctx) => {
//       ctx.Add(node1);
//       ctx.Add(provider2);
//     });

//     const provider2 = BuildNodeProvider((ctx) => {
//       ctx.Add(node1);
//       ctx.Add(provider1);
//     });

//     const allNodes = Array.from(AllNodesVisitor.VisitAll(provider2));

//     expect(allNodes.length).toBe(3);
//     expect(allNodes[0]).toBe(provider2);
//     expect(allNodes[1]).toBe(node1);
//     expect(allNodes[2]).toBe(provider1);
//   });
// });
