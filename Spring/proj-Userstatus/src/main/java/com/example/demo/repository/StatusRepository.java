package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Status;

import jakarta.transaction.Transactional;

public interface StatusRepository extends JpaRepository<Status, Integer> {
	@Query(value="select * from status where softwarestatus=? order by validity",nativeQuery = true)
	List<Status> findBySoftwarestatus(String softwarestatus);
	
	@Query(value="select * from status where softwarestatus='Active' and name=?",nativeQuery = true)
	List<Status> findAllByName(String searchkey);
	
	@Query(value="select * from status where softwarestatus='Active' and productname=:pname",nativeQuery = true)
	List<Status> findAllByProductname(@Param("pname") String searchkey);
	

	@Modifying
	@Transactional
	@Query(value = "UPDATE status SET validity = :newValidity WHERE softwareid = :softwareId AND softwarestatus = 'Active'", nativeQuery = true)
	void changevalid(@Param("newValidity") int newValidity, @Param("softwareId") int softwareId);

	
	@Query(value="select * from status where softwarestatus='Active' and systemid=?",nativeQuery = true)
	List<Status> findsoftwaresofuser(String systemid);
	
	@Query(value="SELECT productname, COUNT(*) AS system_count\r\n"
			+ "FROM status\r\n"
			+ "WHERE softwarestatus = 'Active'\r\n"
			+ "GROUP BY productname\r\n"
			+ "ORDER BY system_count DESC;\r\n"
			+ "",nativeQuery = true)
	List<Object[]> countswVu();
	
	@Query(value="select * from status where systemid=?",nativeQuery=true)
	List<Status> softwaresofuser(String systemid);
	
	@Query(value="select count(*) from status where softwarestatus='Active'",nativeQuery=true)
	int countsoft();
	
	@Query(value="select sum(cost) from status where softwarestatus='Active'",nativeQuery=true)
	int cost();
	
	@Query(value="select * from status where name like '%?%' or productname like '%?%' ",nativeQuery=true)
	List<Status> searchq(String sitem);
	
	
	
	@Query(value="select * from  status where expirydate=?",nativeQuery=true)
	List<Status> getUsersWithExpDate(LocalDate expirydate);
}
