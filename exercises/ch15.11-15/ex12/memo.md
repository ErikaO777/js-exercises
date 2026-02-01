### ollama
`
>curl http://localhost:11434/api/generate -H "Content-Type: application/json" -d {\"model\":\"gemma:2b\",\"prompt\":\"Why is the sky blue?\",\"stream\":false}"
`

`
{"model":"gemma:2b","created_at":"2026-01-31T16:04:22.4499761Z","response":"The sky is blue due to Rayleigh scattering. Rayleigh scattering is the scattering of light by particles of a shorter wavelength, such as blue light, which results in the scattering of blue light being scattered further than other colors. This is why the sky appears blue.","done":true,"done_reason":"stop","context":[968,2997,235298,559,235298,15508,235313,1645,108,4385,603,573,8203,3868,235336,107,235248,108,235322,2997,235298,559,235298,15508,235313,2516,108,651,8203,603,3868,3402,577,153902,38497,235265,153902,38497,603,573,38497,576,2611,731,16071,576,476,25270,35571,235269,1582,685,3868,2611,235269,948,3190,575,573,38497,576,3868,2611,1855,30390,4024,1178,1156,9276,235265,1417,603,3165,573,8203,8149,3868,235265],"total_duration":6454659600,"load_duration":1674599500,"prompt_eval_count":28,"prompt_eval_duration":778110300,"eval_count":52,"eval_duration":3592648300}
`