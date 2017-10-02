#!/bin/bash
git pull origin beta
source activate underthesea.amrbank
cd service; python manage.py runserver 0.0.0.0:8006
