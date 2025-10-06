"""
Simple test script to verify API functionality
Run with: python test_api.py
"""
import requests
import json
from pathlib import Path

API_BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    print("\n🔍 Testing Health Check...")
    try:
        response = requests.get(f"{API_BASE_URL}/health")
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
        assert response.status_code == 200
        print("   ✅ Health check passed!")
        return True
    except Exception as e:
        print(f"   ❌ Health check failed: {e}")
        return False

def test_list_candidates():
    """Test listing candidates"""
    print("\n📋 Testing List Candidates...")
    try:
        response = requests.get(f"{API_BASE_URL}/api/cvs")
        print(f"   Status: {response.status_code}")
        data = response.json()
        print(f"   Found {len(data)} candidates")
        if data:
            print(f"   First candidate: {data[0]['prenom']} {data[0]['nom']}")
        assert response.status_code == 200
        print("   ✅ List candidates passed!")
        return True
    except Exception as e:
        print(f"   ❌ List candidates failed: {e}")
        return False

def test_create_candidate():
    """Test creating a candidate"""
    print("\n➕ Testing Create Candidate...")
    try:
        candidate_data = {
            "prenom": "Test",
            "nom": "User",
            "email": f"test.user.{hash('test')}@example.com",  # Unique email
            "telephone": "+33612345678",
            "niveau_etude": "Master",
            "experience": "3 ans",
            "poste_actuel": "Développeur",
            "evaluation": 4,
            "competences": ["Python", "JavaScript"],
            "tags": ["Test", "Demo"]
        }
        
        response = requests.post(
            f"{API_BASE_URL}/api/create-candidate",
            json=candidate_data
        )
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Created candidate: {data['prenom']} {data['nom']} (ID: {data['id']})")
            print("   ✅ Create candidate passed!")
            return data['id']
        else:
            print(f"   Response: {response.text}")
            return None
    except Exception as e:
        print(f"   ❌ Create candidate failed: {e}")
        return None

def test_get_candidate(candidate_id):
    """Test getting a candidate"""
    print(f"\n👁️ Testing Get Candidate (ID: {candidate_id})...")
    try:
        response = requests.get(f"{API_BASE_URL}/api/cv/{candidate_id}")
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Retrieved: {data['prenom']} {data['nom']}")
            print(f"   Email: {data['email']}")
            print("   ✅ Get candidate passed!")
            return True
        else:
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Get candidate failed: {e}")
        return False

def test_search_candidates():
    """Test searching candidates"""
    print("\n🔍 Testing Search Candidates...")
    try:
        # Search by name
        response = requests.get(f"{API_BASE_URL}/api/search-cv?name=Test")
        print(f"   Status: {response.status_code}")
        data = response.json()
        print(f"   Found {len(data)} candidates matching 'Test'")
        assert response.status_code == 200
        print("   ✅ Search candidates passed!")
        return True
    except Exception as e:
        print(f"   ❌ Search candidates failed: {e}")
        return False

def test_update_candidate(candidate_id):
    """Test updating a candidate"""
    print(f"\n✏️ Testing Update Candidate (ID: {candidate_id})...")
    try:
        update_data = {
            "commentaires": "Test update - Candidate updated via API test",
            "evaluation": 5
        }
        
        response = requests.put(
            f"{API_BASE_URL}/api/update-cv/{candidate_id}",
            json=update_data
        )
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Updated: {data['prenom']} {data['nom']}")
            print(f"   New evaluation: {data['evaluation']}⭐")
            print("   ✅ Update candidate passed!")
            return True
        else:
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Update candidate failed: {e}")
        return False

def test_delete_candidate(candidate_id):
    """Test deleting a candidate"""
    print(f"\n🗑️ Testing Delete Candidate (ID: {candidate_id})...")
    try:
        response = requests.delete(f"{API_BASE_URL}/api/cv/{candidate_id}")
        print(f"   Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Message: {data['message']}")
            print("   ✅ Delete candidate passed!")
            return True
        else:
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"   ❌ Delete candidate failed: {e}")
        return False

def run_all_tests():
    """Run all tests"""
    print("=" * 60)
    print("CV Management System - API Tests")
    print("=" * 60)
    
    print("\n⚠️ Make sure the backend is running on http://localhost:8000")
    print("   Start with: cd backend && python main.py\n")
    
    # Test health
    if not test_health():
        print("\n❌ Backend not responding. Please start the backend first.")
        return
    
    # Test list
    test_list_candidates()
    
    # Test create and get the ID
    candidate_id = test_create_candidate()
    
    if candidate_id:
        # Test get
        test_get_candidate(candidate_id)
        
        # Test update
        test_update_candidate(candidate_id)
        
        # Test search
        test_search_candidates()
        
        # Test delete
        test_delete_candidate(candidate_id)
    
    print("\n" + "=" * 60)
    print("✅ All tests completed!")
    print("=" * 60)

if __name__ == "__main__":
    run_all_tests()
