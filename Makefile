.PHONY:all run test clean jetpack xpi
sdk.version=1.17
CFX=addon-sdk-${sdk.version}/bin/cfx
OUTDIR=igvfox


all: run

igvfox.xpi: xpi
	mv $(OUTDIR)/$@ ./

xpi test run: ${CFX} ${OUTDIR}/data/IGV_64.png
	(cd ${OUTDIR}; ../${CFX} $@)


${OUTDIR}/data/IGV_64.png:
	mkdir -p ${OUTDIR} && \
	curl -o $@ "http://www.broadinstitute.org/igv/projects/current/IGV_64.png"
	
jetpack: ${CFX}
${CFX}:
	curl -L -o "jetpack-sdk-${sdk.version}.zip" "https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/addon-sdk-${sdk.version}.zip" && \
	unzip -o "jetpack-sdk-${sdk.version}.zip" && \
	rm -f "jetpack-sdk-${sdk.version}.zip"

