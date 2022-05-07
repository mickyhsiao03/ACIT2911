import calculate
import pytest 
import os
import os.path

def test_calculate():
    assert calculate.calculate('pytest','ACIT 1420', 1,1,1,1,1,1,1) == 1.0
    assert os.path.exists("./users/pytest.json") == True