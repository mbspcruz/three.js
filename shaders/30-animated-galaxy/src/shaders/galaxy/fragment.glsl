  varying vec3 vColor;
  
  void main() {
		float strenght = distance(gl_PointCoord, vec2(0.5));
		strenght = 1.0 - strenght;
		strenght = pow(strenght, 10.0);
    //final color
	  vec3 color = mix(vec3(0.0), vColor, strenght);
    gl_FragColor = vec4(color, 1.0);
}