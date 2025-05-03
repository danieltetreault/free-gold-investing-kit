const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const imageDir = path.join(__dirname, 'images');
const outputDir = imageDir; // Save optimized images in the same directory
const quality = 80; // WebP quality (0-100)
const maxWidth = 1200; // Maximum width for large images

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files
const imageFiles = fs.readdirSync(imageDir)
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
  });

console.log(`Found ${imageFiles.length} images to process`);

// Process each image
async function processImages() {
  for (const file of imageFiles) {
    const inputPath = path.join(imageDir, file);
    const fileBaseName = path.basename(file, path.extname(file));
    const webpOutputPath = path.join(outputDir, `${fileBaseName}.webp`);
    
    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    
    try {
      // Determine if resizing is needed
      const needsResize = metadata.width > maxWidth;
      
      // Create optimized WebP version
      let sharpInstance = sharp(inputPath);
      
      if (needsResize) {
        console.log(`Resizing ${file} from ${metadata.width}x${metadata.height} to max width ${maxWidth}`);
        sharpInstance = sharpInstance.resize({ width: maxWidth, withoutEnlargement: true });
      }
      
      // Convert to WebP with good quality
      await sharpInstance
        .webp({ quality })
        .toFile(webpOutputPath);
      
      console.log(`Converted ${file} to WebP: ${webpOutputPath}`);
      
      // Special handling for large files that need extra optimization
      if (file === 'physical-gold.jpg' || file === 'expert-tips.jpg') {
        // Create an optimized JPG version as fallback
        const jpgOutputPath = path.join(outputDir, `${fileBaseName}-optimized.jpg`);
        
        await sharp(inputPath)
          .resize({ width: maxWidth, withoutEnlargement: true })
          .jpeg({ quality: 75, progressive: true })
          .toFile(jpgOutputPath);
        
        console.log(`Created optimized JPG version: ${jpgOutputPath}`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
}

// Run the optimization
processImages()
  .then(() => console.log('Image optimization complete!'))
  .catch(err => console.error('Error during image optimization:', err));
