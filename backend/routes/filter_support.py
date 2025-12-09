from flask import Blueprint, jsonify

from backend.db import get_db

bp = Blueprint('filter_support', __name__)

# This file provides endpoints to get options for filtering courses.
# These are really just used to populate dropdowns on the frontend.
# Whoever's actually doing the filtering: feel free to ask me about these!
# ~luna <3

@bp.get('/filter/options/departments')
def get_departments():
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT DISTINCT department
            FROM COURSE_DATA
            ORDER BY department ASC;
        """)
        departments = [row['department'] for row in cursor.fetchall()]
        # TODO: we really need to talk about how to display departments better
        # this might just be a case of we have a giant lookup table stored in the DB
        # that maps department codes to full names (e.g. "CSC" -> "Computer Science")

        # for now, just return the codes
        return jsonify(departments)

@bp.get('/filter/options/attributes')
def get_attributes():
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT DISTINCT coursetypes
            FROM COURSE_DATA;
        """)
        attributes = [row['coursetypes'] for row in cursor.fetchall()]
        # hold up! we ain't done yet
        # coursetypes is a comma-separated string of attributes
        # we need to split them up and get unique values
        unique_attributes = set()
        for attr_string in attributes:
            if attr_string:
                attrs = [attr.strip() for attr in attr_string.split(',')]
                unique_attributes.update(attrs)
        attributes = sorted(unique_attributes) # turn it back into a sorted list
        return jsonify(attributes)

@bp.get('/filter/options/academic_years')
def get_academic_years():
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT DISTINCT academicyear
            FROM COURSE_OFFER
            ORDER BY academicyear ASC;
        """)
        years = [row['academicyear'] for row in cursor.fetchall()]
        return jsonify(years)

@bp.get('/filter/options/blocks')
def get_blocks():
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT DISTINCT session
            FROM COURSE_OFFER
            ORDER BY session ASC;
        """)
        blocks = [row['session'] for row in cursor.fetchall()]
        # TODO: i'd like to show blocks here first!
        return jsonify(blocks)

@bp.get('/filter/options/professors')
def get_professors():
    # get unique professors from COURSE_OFFER
    # some courses have multiple professors separated by commas
    # we need to split them up and get unique values
    with get_db().cursor(dictionary=True) as cursor:
        cursor.execute("""
            SELECT DISTINCT professor
            FROM COURSE_OFFER;
        """)
        professors = [row['professor'] for row in cursor.fetchall()]
        unique_professors = set()
        for prof_string in professors:
            if prof_string:
                profs = [prof.strip() for prof in prof_string.split(',')]
                unique_professors.update(profs)
        # sort by last name (split on space and use last part)
        # this does make a lot of assumptions about names, but it's probably good enough for now
        # hopefully.
        professors = sorted(unique_professors, key=lambda name: name.split()[-1].lower())
        return jsonify(professors)
