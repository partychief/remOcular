# Copyright (C) 2011 Tobias Oetiker
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.

AUTOMAKE_OPTIONS =  foreign

EXTRA_DIST = config.json Manifest.json  readme.txt source/index.html $(shell find source/class/remocular/ -name "*.js") $(wildcard source/translation/*.po source/resource/remocular/*.png  source/resource/remocular/*.gif)

if BUILD_QOOXDOO_APP

.PHONY: source lint pretty

source: source/script/remocular.js

lint:
	$(QOOXDOO_PATH)/tool/bin/generator.py -m QOOXDOO_PATH:$(QOOXDOO_PATH) -m CACHE:./cache lint

pretty:
	$(QOOXDOO_PATH)/tool/bin/generator.py -m QOOXDOO_PATH:$(QOOXDOO_PATH) -m CACHE:./cache pretty
	
source/script/remocular.js: $(shell find source/class/remocular -name "*.js") $(QOOXDOO_PATH)/framework/config.json
	$(QOOXDOO_PATH)/tool/bin/generator.py -m QOOXDOO_PATH:$(QOOXDOO_PATH) -m CACHE:./cache source

endif

clean-local:
	test -d ./cache && rm -r ./cache || true
	test -f source/script/remocular.js && rm source/script/* || true