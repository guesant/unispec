import type { IUniNodeTypeArray } from "./IUniNodeTypeArray";
import type { IUniNodeTypeBoolean } from "./IUniNodeTypeBoolean";
import type { IUniNodeTypeFile } from "./IUniNodeTypeFile";
import type { IUniNodeTypeInteger } from "./IUniNodeTypeInteger";
import type { IUniNodeTypeObject } from "./IUniNodeTypeObject";
import type { IUniNodeTypeReference } from "./IUniNodeTypeReference";
import type { IUniNodeTypeString } from "./IUniNodeTypeString";

export type IUniNodeType = IUniNodeTypeString | IUniNodeTypeInteger | IUniNodeTypeReference | IUniNodeTypeObject | IUniNodeTypeArray | IUniNodeTypeBoolean | IUniNodeTypeFile;
