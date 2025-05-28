import { describe, it, expect } from 'vitest';
import { NodeMappingManager } from './nodeMapping';

describe('NodeMappingManager', () => {
  describe('updateNode', () => {
    it('should filter out empty string values from kwargs', async () => {
      const manager = new NodeMappingManager();
      const nodeId = await manager.addNode({
        type: 'filter',
        name: 'scale',
        inputs: [],
        kwargs: { width: 640, height: 480 },
      });
      const updates = {
        kwargs: {
          width: 800,
          height: '',
          force_original_aspect_ratio: true,
          d: '',
        },
      };
      await manager.updateNode(nodeId, updates);
      const node = manager.getNodeMapping().nodeMap.get(nodeId);
      expect(node).toBeDefined();
      expect(node?.kwargs).toEqual({
        width: 800,
        force_original_aspect_ratio: true,
      });
    });
  });
});
