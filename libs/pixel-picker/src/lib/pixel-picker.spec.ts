import { PixelPicker, pixelPickerFactory } from './pixel-picker';

describe('PixelPicker', () => {
  it('should create PixelPicker instance', () => {
    const target = pixelPickerFactory(document.createElement('canvas'));
    expect(target).toBeInstanceOf(PixelPicker);
  });
});
