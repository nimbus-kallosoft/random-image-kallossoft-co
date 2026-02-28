import { NextResponse } from "next/server";

export async function GET() {
  // Unsplash Source API for random images
  const width = 800;
  const height = 600;
  
  // Use Unsplash Source with a cache-busting timestamp
  const timestamp = Date.now();
  const unsplashUrl = `https://source.unsplash.com/random/${width}x${height}?sig=${timestamp}`;
  
  try {
    // Fetch from Unsplash to get the actual image URL (follows redirects)
    const response = await fetch(unsplashUrl, {
      method: "HEAD",
      redirect: "manual",
    });
    
    // Get the final redirected URL
    const imageUrl = response.headers.get("location") || unsplashUrl;
    
    // Extract photographer info from URL if available
    // Unsplash URLs often contain photo ID and user info
    const photoMatch = imageUrl.match(/photo-([a-zA-Z0-9_-]+)/);
    const photographer = photoMatch 
      ? `Unsplash Photographer` 
      : "Unsplash Photographer";
    
    return NextResponse.json({
      imageUrl,
      photographer,
    });
  } catch (error) {
    // Fallback to a direct Unsplash URL if the API fails
    return NextResponse.json({
      imageUrl: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=${width}&h=${height}&fit=crop`,
      photographer: "Unsplash",
    });
  }
}
