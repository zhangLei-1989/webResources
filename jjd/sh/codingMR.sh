#!/bin/bash
git push origin `git branch | sed -n '/\* /s///p'`:mr/master/`git branch | sed -n '/\* /s///p'`
