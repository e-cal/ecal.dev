## Brain-Computer Interface

![Ethan demoing brain computer interface at CUCAI 2023](static/images/bci.jpg)

A brain-computer interface game controller built with the OpenBCI Ultracortex
Mark IV using `brainflow` (python), hacked together in few hour work sessions
over 5 weeks. 

Heavy signal processing filters and transforms the raw electrode readings into a
useable signal, used to train various ML models. After some failed experiments
with CNNs and Transformer-based architectures, our simple SVM model achieved the
best performance @ 94.4% validation accuracy.

Demoed at CUCAI 2023, where I played flappy bird in front of a live audience.
