// varying vec3 vColor;

// void main()
// {

//     vec2 uv = gl_PointCoord;
//     float distanceToCenter = length(uv - 0.5);
//     float alpha = 0.05 / distanceToCenter - 0.1;
    
//     gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
//     //  gl_FragColor = vec4(vColor, alpha);
//     #include <tonemapping_fragment>
//     #include <colorspace_fragment>
// }

varying vec3 vColor;

void main()
{
    vec2 uv = gl_PointCoord;
    float distanceToCenter = length(uv - 0.5);
    float alpha = 0.05 / distanceToCenter - 0.1;
    
    // gl_FragColor = vec4(colorStart, alpha);
     gl_FragColor = vec4(vColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}

// varying vec3 vColor;

// void main()
// {
//     vec2 uv = gl_PointCoord;
//     float distanceToCenter = length(uv - 0.5);
    
//     // Define fire colors
//     // vec3 colorStart = vec3(1.0, 0.5, 0.0); // Start color (orange)
//     // vec3 colorEnd = vec3(1.0, 0.0, 0.0);   // End color (red)
//     vec3 colorStart = vec3(0.8, 0.2, 0.0); // Darker orange
//     vec3 colorEnd = vec3(0.6, 0.0, 0.0);   // Darker red
    
//     // Interpolate between colors based on distance from center
//     vec3 fireColor = mix(colorStart, colorEnd, smoothstep(0.0, 0.5, distanceToCenter));
    
//     // Calculate alpha
//     float alpha = 0.05 / distanceToCenter - 0.1;
    
//     // Output final color
//     gl_FragColor = vec4(colorStart, alpha);
    
//     // Apply tone mapping and color space conversion (if needed)
//     #include <tonemapping_fragment>
//     #include <colorspace_fragment>
// }
